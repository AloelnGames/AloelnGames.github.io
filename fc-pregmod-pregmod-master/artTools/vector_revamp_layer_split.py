#!/usr/bin/env python3

'''
Application for splitting groups from one SVG file into separate files

Usage:
python3 vector_layer_split.py infile format outdir

Usage Example:
python3 vector_layer_split.py vector_source.svg tw ../src/art/vector/layers/
'''

import lxml.etree as etree
from lxml.etree import XMLParser, parse

import sys
import os
import copy
import re
import argparse
import normalize_svg

parser = argparse.ArgumentParser(
	description='Application for splitting groups from one SVG file into separate files.')
parser.add_argument('-o', '--output', dest='output_dir', required=True,
					help='output directory')
parser.add_argument('-f', '--format', dest='output_format',
					choices=['svg', 'tw'], default='svg', help='output format.')
parser.add_argument('-p', '--prefix', dest='prefix', default='',
					help='Prepend this string to result file names')
parser.add_argument('input_file', metavar='FILENAME', nargs=1,
					help='Input SVG file with layers')

args = parser.parse_args()

output_format = args.output_format
output_directory = args.output_dir
input_file = args.input_file[0]


if not os.path.exists(output_directory):
	os.makedirs(output_directory)

ns = {
	'svg': 'http://www.w3.org/2000/svg',
	'inkscape': 'http://www.inkscape.org/namespaces/inkscape',
	'sodipodi': "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd",
}

p = XMLParser(huge_tree=True)
tree = parse(input_file, parser=p)
#tree = etree.parse(input_file)
normalize_svg.fix(tree)

# prepare output template
template = copy.deepcopy(tree)
root = template.getroot()

# remove all svg root attributes except document size
for a in root.attrib:
	if (a != "viewBox"):
		del root.attrib[a]

# remove all content, including metadata
# for twine output, style definitions are removed, too
defs = None
for e in root:
	if (e.tag == etree.QName(ns['svg'], 'defs')):
		defs = e
	if (e.tag == etree.QName(ns['svg'], 'g') or
			e.tag == etree.QName(ns['svg'], 'metadata') or
			e.tag == etree.QName(ns['svg'], 'defs') or
			e.tag == etree.QName(ns['sodipodi'], 'namedview') or
			(output_format == 'tw' and e.tag == etree.QName(ns['svg'], 'style'))
	):
		root.remove(e)
# template preparation finished

# prepare regex for later use
regex_xmlns = re.compile(' xmlns[^ ]+')
regex_space = re.compile(r'[>]\s+[<]')

# find all groups
layers = tree.xpath('//svg:g', namespaces=ns)
for layer in layers:
	i = layer.get('id')
	if (  # disregard non-content groups
			i.endswith("_") or  # manually suppressed with underscore
			i.startswith("XMLID") or  # Illustrator generated group
			i.startswith("g")  # Inkscape generated group
	):
		continue
	# create new canvas
	output = copy.deepcopy(template)
	# copy all shapes into template
	canvas = output.getroot()
	for e in layer:
		canvas.append(e)
	# represent template as SVG (binary string)
	svg = etree.tostring(output, pretty_print=False)
	# poor man's conditional defs insertion
	# TODO: extract only referenced defs (filters, gradients, ...)
	# TODO: detect necessity by traversing the elements. do not stupidly search in the string representation
	if ("filter:" in svg.decode('utf-8')):
		# it seems there is a filter referenced in the generated SVG, re-insert defs from main document
		canvas.insert(0, defs)
		# re-generate output
		svg = etree.tostring(output, pretty_print=False)
	elif ("clip-path=" in svg.decode('utf-8')):
		# it seems there is a clip path referenced in the generated SVG, re-insert defs from main document
		canvas.insert(0, defs)
		# re-generate output
		svg = etree.tostring(output, pretty_print=False)

	if (output_format == 'tw'):
		# remove unnecessary attributes
		# TODO: never generate unnecessary attributes in the first place
		svg = svg.decode('utf-8')
		svg = regex_xmlns.sub('', svg)
		svg = svg.replace(' inkscape:connector-curvature="0"', '')  # this just saves space
		svg = svg.replace('\n', '').replace('\r', '')  # print cannot be multi-line
		svg = regex_space.sub('><', svg)  # remove indentation
		svg = svg.replace('svg:', '')  # svg namespace was removed

		if (not svg.endswith('\n')):
			svg += '\n'
		svg = svg.encode('utf-8')

	# save SVG string to file
	i = layer.get('id')
	output_path = os.path.join(output_directory, "{0}{1}.svg".format(args.prefix, i))
	with open(output_path, 'wb') as f:
		if (output_format == 'svg'):
			# Header for normal SVG (XML)
			f.write('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'.encode("utf-8"))
			f.write(svg)
		elif (output_format == 'tw'):
			f.write(svg)
