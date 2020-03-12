#!/bin/ksh
mega-login $1 $2 #U=$1 P=$2 rDir=$3 lDir=$4 Reqs:MEGAcmd,git
while true;do gen=0;cd $4;
	if [[ `echo $?` -gt 0 ]];then mkdir -p $4&&git clone -q --depth 1 https://gitgud.io/pregmodfan/fc-pregmod.git $4&&cd $4
		if [[ ! `mega-ls $3|cut -c21-24|paste -sd,` =~ `git log|head -1|cut -c8-11` ]];then gen=1;fi #stackoverflow.com/a/15394738
	fi
	git fetch -q && if [ `git rev-list ...origin|wc -l` -gt 0 ];then git pull -q&&gen=1;fi #stackoverflow.com/a/17192101
	if [[ $gen > 0 ]];then rm bin/*;./compile.sh -q&&cd bin/
		mv *.h* FC-`git log -1 --format=%cd --date=format:%m-%d-%Y-%H-%M`-`git log|head -1|cut -c8-11`.html
		mega-put -c *.h* $3&&mega-rm $3`mega-ls $3|head -n 1`
	fi
clear;sleep 15m;done