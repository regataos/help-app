#!/bin/bash

# Checking internet connection
if ! ping -c 1 google.com ; then
	sleep 2

	if ! ping -c 1 google.com ; then
		echo "offline" > /tmp/apps-scripts/network-status.txt
	else
		echo "online" > /tmp/apps-scripts/network-status.txt
	fi

else
	echo "online" > /tmp/apps-scripts/network-status.txt
fi

# We're finished!
exit 0
