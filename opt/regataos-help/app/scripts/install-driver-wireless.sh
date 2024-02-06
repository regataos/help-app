#!/bin/bash
#
# This script check the wifi chip and install the wireless driver.

# Install driver
function installDriver() {
	echo "Install driver: $driver"

	ps -C "packagekitd | zypper | yast2" >/dev/null
	if [ $? = 0 ]; then
		ps -C rpm >/dev/null
		if [ $? = 0 ]; then
			echo "RPM is here, installation aborted..."
			exit 0

		else
			echo "RPM is not here!"
			echo "Closing packagekitd, zypper and yast2..."
			killall packagekitd
			killall zypper
			killall yast2

			sudo zypper --non-interactive ref $(cat /usr/share/regataos/regataos-base-version.txt | grep mainRepositoryName | cut -d"=" -f 2-)
			sudo zypper --non-interactive --no-gpg-checks install --auto-agree-with-licenses $driver
		fi

	else
		echo "RPM is not here!"
		sudo zypper --non-interactive ref $(cat /usr/share/regataos/regataos-base-version.txt | grep mainRepositoryName | cut -d"=" -f 2-)
		sudo zypper --non-interactive --no-gpg-checks install --auto-agree-with-licenses $driver
	fi
}

# Notify driver installation
function notifyDriverInstallation() {
	getTranslationFile="$(/opt/regataos-help/scripts/choose-translation start)"
	notifyApp="$(cat $getTranslationFile | grep upRepoManuallyNotifyApp= | cut -d"=" -f 2- | sed 's/"//g')"

	user=$(users | awk '{print $1}')
	userId=$(id -u $user)

	sudo -u $user DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$userId/bus \
		notify-send -i network-wired-activated -t 13000 -u normal -a "$notifyApp" "$notifyTitle" "$(echo -e "$notifyText")"
}

# Check Broadcom wireless
checkBroadcomWireless=$(lspci | grep BCM)

chipList=(
	BCM4311
	BCM4312
	BCM4321
	BCM4322
	BCM4328
	BCM4331
	BCM4365
)

for chip in "${chipList[@]}"; do
	if [[ $(echo "$checkBroadcomWireless") == *"$chip"* ]]; then
		if [[ $(rpm -q broadcom-wl) != *"x86_64"* ]]; then
			driver="broadcom-wl broadcom-wl-kmp-default broadcom-wl-ueficert"
			installDriver

			if [[ $(rpm -q broadcom-wl) == *"x86_64"* ]]; then
				getTranslationFile="$(/opt/regataos-help/scripts/choose-translation start)"
				notifyTitle="$(cat $getTranslationFile | grep notifyDriverBroadcomTitle= | cut -d"=" -f 2- | sed 's/"//g')"
				notifyText="$(cat $getTranslationFile | grep notifyDriverInstallText= | cut -d"=" -f 2- | sed 's/"//g')"

				notifyDriverInstallation
			fi
		fi

	else
		echo "Broadcom wireless chip not found on the machine."
	fi
done
