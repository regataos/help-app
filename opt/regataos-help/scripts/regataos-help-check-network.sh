#!/bin/bash

cd /

while :
do

# Checking internet connection
function check_network() {
	if ! ping -c 1 www.google.com.br ; then

		sleep 2

		if ! ping -c 1 www.google.com.br ; then
			echo "online" > /tmp/apps-scripts/network-status.txt
		else
			echo "online" > /tmp/apps-scripts/network-status.txt
		fi

	else
		echo "online" > /tmp/apps-scripts/network-status.txt
	fi
}

ps -C regataoshelp > /dev/null
if [ $? = 0 ]
then
	check_network
fi

ps -C regataosgcs > /dev/null
if [ $? = 0 ]
then
	check_network
fi

ps -C magma > /dev/null
if [ $? = 0 ]
then
	check_network
fi

   sleep 3
done
