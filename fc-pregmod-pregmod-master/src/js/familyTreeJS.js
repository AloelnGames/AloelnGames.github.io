/* eslint-disable camelcase */
/* eslint-disable no-console */
let lastActiveSlave, lastSlaves, lastPC;

/*
	To use, add something like:

<div id="familyTree"></div>
	<span id="familyTreeLink">
		<<link "Pull up the file on $his family tree.">>
		<<replace #familyTreeLink>>
			<<run renderFamilyTree($slaves, $activeSlave.ID)>>
		<</replace>>
	<</link>>
</span>

*/

window.renderFamilyTree = function(slaves, filterID) {
	'use strict';

	let ftreeWidth, ftreeHeight;
	let chartWidth, chartHeight;
	let margin;
	d3.select('#ftree-canvas').remove();
	let svg = d3.select('#familyTree')
		.append('svg')
		.attr('id', 'ftree-canvas');
	let chartLayer = svg.append('g').classed('chartLayer', true);

	let data = buildFamilyTree(slaves, filterID);

	initFtreeSVG(data);
	runFtreeSim(data);

	function initFtreeSVG(data) {
		ftreeWidth = data.nodes.length * 45;
		ftreeHeight = data.nodes.length * 35;
		if (ftreeWidth < 600) {
			ftreeWidth = 600;
		} else if (ftreeWidth > 1920) {
			ftreeWidth = 1920;
		}
		if (ftreeHeight < 480) {
			ftreeHeight = 480;
		} else if (ftreeHeight > 1200) {
			ftreeHeight = 1200;
		}

		margin = {
			top: 0,
			left: 0,
			bottom: 0,
			right: 0
		};


		chartWidth = ftreeWidth - (margin.left + margin.right);
		chartHeight = ftreeHeight - (margin.top + margin.bottom);

		svg.attr('width', ftreeWidth).attr('height', ftreeHeight);

		svg.append('defs');

		svg.append('defs').append('marker')
			.attr('id', 'arrowhead')
			.attr('viewBox', '-0 -5 10 10')
			.attr('refX', 13)
			.attr('refY', 0)
			.attr('orient', 'auto')
			.attr('markerWidth', 13)
			.attr('markerHeight', 13)
			.attr('xoverflow', 'visible')
			.append('svg:path')
			.attr('d', 'M 0,-1 L 5,0 L 0,1')
			.attr('fill', '#a1a1a1')
			.style('stroke', 'none');

		chartLayer
			.attr('width', chartWidth)
			.attr('height', chartHeight)
			.attr('transform', `translate(${[margin.left, margin.top]})`);
	}

	function runFtreeSim(data) {
		let simulation = d3.forceSimulation()
			.force('link', d3.forceLink().id(function(d) {
				return d.index;
			}))
			// eslint-disable-next-line no-unused-vars
			.force('collide', d3.forceCollide(function(d) {
				return 60;
			}).iterations(4))
			.force('charge', d3.forceManyBody().strength(-200).distanceMin(100).distanceMax(1000))
			.force('center', d3.forceCenter(chartWidth / 2, chartHeight / 2))
			.force('y', d3.forceY(100))
			.force('x', d3.forceX(200));

		let link = svg.append('g')
			.attr('class', 'link')
			.selectAll('link')
			.data(data.links)
			.enter()
			.append('line')
			.attr('marker-end', 'url(#arrowhead)')
			.attr('stroke', function(d) {
				if (d.type === 'homologous') {
					return '#862d59';
				} else if (d.type === 'paternal') {
					return '#24478f';
				} else {
					return '#aa909b';
				}
			})
			.attr('stroke-width', 2)
			.attr('fill', 'none');

		let node = svg.selectAll('.node')
			.data(data.nodes)
			.enter().append('g')
			.attr('class', 'node')
			.call(d3.drag()
				.on('start', dragstarted)
				.on('drag', dragged)
				.on('end', dragended));

		node.append('circle')
			.attr('r', function(d) { return d.r; })
			.attr('stroke', function(d) {
				if (d.ID === filterID) {
					return '#ffff20';
				} else {
					return '#5a5a5a';
				}
			})
			.attr('class', 'node-circle')
			.attr('r', 20);

		node.append('text')
			.text(function(d) {
				let ssym;
				if (d.dick > 0 && d.vagina > -1) {
					ssym = '☿';
				} else if (d.dick > 0) {
					ssym = '♂';
				} else if (d.vagina > -1) {
					ssym = '♀';
				} else {
					ssym = '?';
				}
				return `${d.name}(${ssym})`;
			})
			.attr('dy', 4)
			.attr('dx', function(d) {
				return -(8 * d.name.length) / 2;
			})
			.attr('class', 'node-text')
			.style('fill', function(d) {
				if (d.is_mother && d.is_father) {
					return '#b84dff';
				} else if (d.is_father) {
					return '#00ffff';
				} else if (d.is_mother) {
					return '#ff3399';
				} else if (d.unborn) {
					return '#a3a3c2';
				} else {
					return '#66cc66';
				}
			});

		svg.selectAll('.node-circle');
		svg.selectAll('.node-text');

		let ticked = function() {
			link
				.attr('x1', function(d) { return d.source.x; })
				.attr('y1', function(d) { return d.source.y; })
				.attr('x2', function(d) { return d.target.x; })
				.attr('y2', function(d) { return d.target.y; });

			node
				.attr("transform", function(d) { return `translate(${d.x}, ${d.y})`; });
		};

		simulation.nodes(data.nodes)
			.on('tick', ticked);

		simulation.force('link')
			.links(data.links);

		function dragstarted(d) {
			if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(d) {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
		}

		function dragended(d) {
			if (!d3.event.active) { simulation.alphaTarget(0); }
			d.fx = null;
			d.fy = null;
		}
	}
};

window.buildFamilyTree = function(slaves, filterID) {
	let family_graph = {nodes: [], links: []};
	let node_lookup = {};
	let preset_lookup = {
		'-2': 'A citizen',
		'-3': 'Former Master',
		'-4': 'An arcology owner',
		'-5': 'Client',
		'-6': 'Social Elite',
		'-7': 'Gene lab'
	};
	let outdads = {};
	let outmoms = {};
	let kids = {};

	let fake_pc = {
		slaveName: `${State.variables.PC.slaveName}(You)`,
		mother: State.variables.PC.mother,
		father: State.variables.PC.father,
		dick: State.variables.PC.dick,
		vagina: State.variables.PC.vagina,
		ID: State.variables.PC.ID
	};
	let charList = [fake_pc];
	charList.push.apply(charList, slaves);
	charList.push.apply(charList, State.variables.tanks);

	let unborn = {};
	for (let i = 0; i < State.variables.tanks.length; i++) {
		unborn[State.variables.tanks[i].ID] = true;
	}
	for (let i = 0; i < State.variables.cribs.length; i++) {
		unborn[State.variables.cribs[i].ID] = true;
	}

	for (let i = 0; i < charList.length; i++) {
		let mom = charList[i].mother;
		let dad = charList[i].father;

		if (mom) {
			if (!kids[mom]) {
				kids[mom] = {};
			}
			kids[mom].mother = true;
		}
		if (dad) {
			if (!kids[dad]) {
				kids[dad] = {};
			}
			kids[dad].father = true;
		}
	}

	for (let i = 0; i < charList.length; i++) {
		let character = charList[i];
		if (character.mother === 0 && character.father === 0 && !kids[character.ID]) {
			continue;
		}
		let mom = character.mother;
		if (mom < -6) {
			if (mom in State.variables.missingTable && State.variables.showMissingSlaves) {
				if (typeof node_lookup[mom] === 'undefined') {
					node_lookup[mom] = family_graph.nodes.length;
					let missing = State.variables.missingTable[mom];
					charList.push({
						ID: mom,
						mother: 0,
						father: 0,
						is_mother: true,
						dick: missing.dick,
						vagina: missing.vagina,
						slaveName: missing.slaveName
					});
				}
			} else {
				if (typeof outmoms[mom] === 'undefined') {
					outmoms[mom] = [];
				}
				outmoms[mom].push(character.slaveName);
			}
		} else if (mom < 0 && typeof node_lookup[mom] === 'undefined' && typeof preset_lookup[mom] !== 'undefined') {
			node_lookup[mom] = family_graph.nodes.length;
			charList.push({
				ID: mom,
				mother: 0,
				father: 0,
				is_father: true,
				dick: 0,
				vagina: 1,
				slaveName: preset_lookup[mom]
			});
		}

		let dad = character.father;
		if (dad < -6) {
			if (dad in State.variables.missingTable && State.variables.showMissingSlaves) {
				if (typeof node_lookup[dad] === 'undefined') {
					node_lookup[dad] = family_graph.nodes.length;
					let missing = State.variables.missingTable[dad];
					charList.push({
						ID: dad,
						mother: 0,
						father: 0,
						is_father: true,
						dick: missing.dick,
						vagina: missing.vagina,
						slaveName: missing.slaveName
					});
				}
			} else {
				if (typeof outdads[dad] === 'undefined') {
					outdads[dad] = [];
				}
				outdads[dad].push(character.slaveName);
			}
		} else if (dad < 0 && typeof node_lookup[dad] === 'undefined' && typeof preset_lookup[dad] !== 'undefined') {
			node_lookup[dad] = family_graph.nodes.length;
			charList.push({
				ID: dad,
				mother: 0,
				father: 0,
				is_father: true,
				dick: 1,
				vagina: -1,
				slaveName: preset_lookup[dad]
			});
		}
	}
	let mkeys = Object.keys(outmoms);
	for (let i = 0; i < mkeys.length; i++) {
		let name;
		let key = mkeys[i];
		let names = outmoms[key];
		if (names.length === 1) {
			name = names[0];
		} else if (names.length === 2) {
			name = names.join(' and ');
		} else {
			names[-1] = `and ${names[-1]}`;
			name = names.join(', ');
		}
		node_lookup[key] = family_graph.nodes.length;
		// Outside extant slaves set
		charList.push({
			ID: key,
			mother: 0,
			father: 0,
			is_mother: true,
			dick: 0,
			vagina: 1,
			slaveName: `${name}'s mother`
		});
	}

	let dkeys = Object.keys(outdads);
	for (let i = 0; i < dkeys.length; i++) {
		let name;
		let key = dkeys[i];
		let names = outdads[key];
		if (names.length === 1) {
			name = names[0];
		} else if (names.length === 2) {
			name = names.join(' and ');
		} else {
			names[-1] = `and ${names[-1]}`;
			name = names.join(', ');
		}
		node_lookup[key] = family_graph.nodes.length;
		// Outside extant slaves set
		charList.push({
			ID: key,
			mother: 0,
			father: 0,
			is_father: true,
			dick: 1,
			vagina: -1,
			slaveName: `${name}'s father`
		});
	}

	let charHash = {};
	for (let i = 0; i < charList.length; i++) {
		charHash[charList[i].ID] = charList[i];
	}

	let related = {};
	let seen = {};
	let saveTree = {};

	function relatedTo(character, targetID, relIDs = {tree: {}, related: false}) {
		relIDs.tree[character.ID] = true;
		if (related[character.ID]) {
			relIDs.related = true;
			return relIDs;
		}
		if (character.ID === targetID) {
			relIDs.related = true;
		}
		if (seen[character.ID]) {
			return relIDs;
		}
		seen[character.ID] = true;
		if (character.mother !== 0) {
			if (charHash[character.mother]) {
				relatedTo(charHash[character.mother], targetID, relIDs);
			}
		}
		if (character.father !== 0) {
			if (charHash[character.father]) {
				relatedTo(charHash[character.father], targetID, relIDs);
			}
		}
		return relIDs;
	}
	if (filterID) {
		if (charHash[filterID]) {
			let relIDs = relatedTo(charHash[filterID], filterID);
			for (let k in relIDs.tree) {
				related[k] = true;
			}
			for (let i = 0; i < charList.length; i++) {
				if (charHash[charList[i].ID]) {
					let pRelIDs = relatedTo(charHash[charList[i].ID], filterID);
					if (pRelIDs.related) {
						for (let k in pRelIDs.tree) {
							related[k] = true;
							if (saveTree[k]) {
								for (let k2 in saveTree[k].tree) {
									related[k2] = true;
								}
							}
						}
					}
					saveTree[charList[i].ID] = pRelIDs;
				}
			}
		}
	}

	for (let i = 0; i < charList.length; i++) {
		let character = charList[i];
		let char_id = character.ID;
		if (char_id !== filterID) {
			if (character.mother === 0 && character.father === 0 && !kids[char_id]) {
				continue;
			}
			if (filterID && !related[char_id]) {
				continue;
			}
		}
		node_lookup[char_id] = family_graph.nodes.length;
		let char_obj = {
			ID: char_id,
			name: character.slaveName,
			dick: character.dick,
			unborn: !!unborn[char_id],
			vagina: character.vagina
		};
		if (kids[char_id]) {
			char_obj.is_mother = !!kids[char_id].mother;
			char_obj.is_father = !!kids[char_id].father;
		} else {
			char_obj.is_mother = false;
			char_obj.is_father = false;
		}
		family_graph.nodes.push(char_obj);
	}

	for (let i = 0; i < charList.length; i++) {
		let character = charList[i];
		let char_id = character.ID;
		if (character.mother === 0 && character.father === 0 && !kids[char_id]) {
			continue;
		}
		if (filterID && !related[char_id]) {
			if (related[character.mother]) {
				console.log('wtf, mom');
			}
			if (related[character.father]) {
				console.log('wtf, dad');
			}
			continue;
		}
		if (typeof node_lookup[character.mother] !== 'undefined') {
			let ltype;
			if (character.mother === character.father) {
				ltype = 'homologous';
			} else {
				ltype = 'maternal';
			}
			family_graph.links.push({
				type: ltype,
				target: node_lookup[char_id] * 1,
				source: node_lookup[character.mother] * 1
			});
		}
		if (character.mother === character.father) {
			continue;
		}
		if (typeof node_lookup[character.father] !== 'undefined') {
			family_graph.links.push({type: 'paternal', target: node_lookup[char_id] * 1, source: node_lookup[character.father] * 1});
		}
	}
	return family_graph;
};

/* Old version. To use, do something like:
<div id="editFamily">
	<div id="graph"></div>
</div>

<<run updateFamilyTree($activeSlave, $slaves, $PC)>>
html_script_tag updateFamilyTree() end_html_script_tag
// tweego freaks out if the actual end of script tag is used even inside a comment
If you want to update the tree, just re-call the run line.

If there's no active slave, you can do:

<<run updateFamilyTree(null, $slaves, $PC)>>
*/

window.updateFamilyTree = function(activeSlave = lastActiveSlave, slaves = lastSlaves, PC = lastPC) {
	lastActiveSlave = activeSlave;
	lastSlaves = slaves;
	lastPC = PC;
	let treeDepth = 0;
	let numTreeNodes = 0;

	let graphElement = document.getElementById("graph");
	if (!graphElement) {
		return;
	}
	graphElement.innerHTML = "";

	/* The way this code works is that we start with the activeSlave then we call
		slaveInfo() recursively to work our way up the tree finding their parents.

	*/

	function getSlave(id, expectedGenes) {
		if (id === -1) {
			return {
				"slaveName": "YOU",
				"ID": id,
				"physicalAge": PC.physicalAge,
				"genes": PC.genes,
				"father": PC.father,
				"mother": PC.mother
			};
		}
		if (id === 0) {
			return {"slaveName": "-", "ID": id, "genes": expectedGenes};
		}
		if (id === activeSlave.ID) {
			return activeSlave;
		}
		for (let i = 0; i < slaves.length; ++i) {
			if (slaves[i].ID === id) {
				return slaves[i];
			}
		}
		return {
			"slaveName": "-",
			"ID": id,
			"genes": expectedGenes
		};
	}

	function slaveInfo(slave, activeSlaveId, recursionProtectSlaveId = {}) {
		numTreeNodes = 0;
		treeDepth = 0;
		if (recursionProtectSlaveId[slave.ID]) {
			console.log("Recursion protection");
			return slaveInfo_(slave, activeSlaveId);
		}
		recursionProtectSlaveId[slave.ID] = true;

		if (typeof slave.father === "undefined" || typeof slave.mother === "undefined") {
			return slaveInfo_(slave, activeSlaveId);
		}

		if (slave.father === -1 || slave.mother === -1) {
			return slaveInfo(getSlave(-1), activeSlaveId, recursionProtectSlaveId);
		}
		if (slave.father !== 0) {
			return slaveInfo(getSlave(slave.father, "unknownXY"), activeSlaveId, recursionProtectSlaveId);
		}

		if (slave.mother !== 0) {
			return slaveInfo(getSlave(slave.mother, "unknownXX"), activeSlaveId, recursionProtectSlaveId);
		}
		return slaveInfo_(slave, activeSlaveId);
	}

	function slaveInfo_(slave, activeSlaveId, slavesAdded = {}, depth = 1) {
		numTreeNodes += 1;
		treeDepth = Math.max(treeDepth, depth);
		let shouldAddChildren = false;
		if (!slavesAdded[slave.ID]) {
			shouldAddChildren = true;
			slavesAdded[slave.ID] = true;
		}
		let data = {
			"name": slave.slaveName + (slave.physicalAge ? (`&nbsp;(${slave.physicalAge})`) : ""),
			"class": slave.genes,
			"textClass": (activeSlaveId === slave.ID) ? "emphasis" : "",
			"marriages": [],
		};

		let spouseToChild = {};

		function maybeAddSpouseToChild(child) {
			if (child.ID === slave.ID) {
				return;
			}
			if (child.father === slave.ID) {
				if (!spouseToChild[child.mother]) {
					spouseToChild[child.mother] = [];
				}
				spouseToChild[child.mother].push(child);
			} else if (child.mother === slave.ID) {
				if (!spouseToChild[child.father]) {
					spouseToChild[child.father] = [];
				}
				spouseToChild[child.father].push(child);
			}
		}

		if (activeSlave.ID !== PC.ID) {
			maybeAddSpouseToChild(activeSlave);
		}
		maybeAddSpouseToChild(getSlave(-1));

		for (let i = 0; i < slaves.length; ++i) {
			let child = slaves[i];
			if (child.ID !== activeSlave.ID) {
				maybeAddSpouseToChild(child);
			}
		}

		for (let key in spouseToChild) {
			if (spouseToChild.hasOwnProperty(key)) {
				let children = shouldAddChildren ? spouseToChild[key] : [];
				let spouse = getSlave(key, (slaves.genes === "XX") ? "unknownXY" : (slaves.genes === "XY") ? "unknownXX" : "unknown");
				let spouseName;
				if (spouse.ID !== slave.ID) {
					spouseName = spouse.slaveName + (spouse.physicalAge ? (`&nbsp;(${spouse.physicalAge})`) : "");
				} else {
					spouseName = (spouse.ID === -1) ? "(yourself)" : "(themselves)";
				}
				let marriage = {
					"spouse": {"name": spouseName, "class": spouse.genes},
					"children": children.map(function(x) { return slaveInfo_(x, activeSlaveId, slavesAdded, depth + 1); })
				};
				data.marriages.push(marriage);
			}
		}
		return data;
	}

	if (activeSlave === PC || activeSlave === null) {
		activeSlave = getSlave(-1);
	}
	const treeData = [slaveInfo(activeSlave, activeSlave.ID)];
	console.log("Family tree is", treeData, 'and has:', numTreeNodes);

	let parentWidth = document.getElementById('editFamily').offsetWidth;

	console.log(parentWidth, document.getElementById('passages').offsetWidth);
	if (!parentWidth) {
		parentWidth = document.body.offsetWidth - 483;
	}

	console.log(parentWidth, Math.min(200 + 40 * numTreeNodes, parentWidth - 200) + 200);

	dTree.init(treeData, {
		target: "#graph",
		debug: true,
		height: 50 + 50 * treeDepth,
		/* very rough heuristics */
		width: Math.min(200 + 40 * numTreeNodes,
			parentWidth - 200) + 200,
		callbacks: {
			nodeClick: function( /* name, extra*/ ) {}
		}
	});
};
