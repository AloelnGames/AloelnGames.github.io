#!/bin/bash
echo "Use temp [0], dump file to current directory [1] or overwrite file in place [2]" && read varname1
echo "Use upstream [1] or origin [0]" && read varname2
if [[ $varname2 == 0 ]];then
	echo "Use master [1] or current branch [0]." && read varname3
else
	varname3=1;
fi
echo "Dry run? 1:0" && read varname4

if [[ $varname2 == 1 ]];then
	varname2='pregmodfan'
else
	varname2=$(git remote show origin|grep -e /|head -n 1|sed s#git@ssh.gitgud.io:#https://gitgud.io/#|cut -c 32-|sed s#/fc-pregmod.git##)
fi
if [[ $varname3 == 1 ]];then
	varname3='pregmod-master'
else
	varname3=$(git rev-parse --abbrev-ref HEAD)
fi

if [[ $varname4 == 1 ]];then
 echo "https://gitgud.io/$varname2/fc-pregmod/raw/$varname3/"
else
	for ((i=1; i<=$#; i++))
	do
		if [[ $varname1 == 0 ]]; then
			wget -q -P /tmp/ https://gitgud.io/$varname2/fc-pregmod/raw/$varname3/${!i}
		elif [[ $varname1 == 1 ]]; then
			wget -q https://gitgud.io/$varname2/fc-pregmod/raw/$varname3/${!i}
		else 
			curl -s https://gitgud.io/$varname2/fc-pregmod/raw/$varname3/${!i} > ${!i}
		fi 
	done
fi 