#!/bin/sh

# Get the translated text
getTranslationFile="$(/opt/regataos-help/scripts/choose-translation start)"
title="$(cat $getTranslationFile | grep restoreConfig= | cut -d"=" -f 2- | sed 's/"//g')"
text="$(cat $getTranslationFile | grep restoreConfigQuestion= | cut -d"=" -f 2- | sed 's/"//g')"
yesButton="$(cat $getTranslationFile | grep restoreConfigYes= | cut -d"=" -f 2- | sed 's/"//g')"
cancelButton="$(cat $getTranslationFile | grep restoreConfigCancel= | cut -d"=" -f 2- | sed 's/"//g')"

sudo -H env DISPLAY=:0 zenity --question --text "$text" --icon-name=preferences-system-time \
    --title "$title" --ok-label "$yesButton" --cancel-label "$cancelButton" --width 300 \
    --window-icon "/usr/share/icons/breeze/preferences/32/preferences-system-time.svg"
if [ $? -eq "0" ]
then
    # Get username
    user=$(users | awk '{print $1}')

	# Create desktop shortcut
    #Find the user's desktop
    test -f "${XDG_CONFIG_HOME:-/home/$user/.config}/user-dirs.dirs" && source "${XDG_CONFIG_HOME:-/home/$user/.config}/user-dirs.dirs"
    desktop_dir="${XDG_DESKTOP_DIR:-/home/$user/Desktop}"
    desktop_folder="$(echo $desktop_dir | cut -d/ -f 3-)"
    desktop_dir="/home/$user/$desktop_folder"

    #Create desktop shortcuts only if necessary
    if test ! -e "$desktop_dir/trash.desktop"; then
        cp -f "/opt/regataos-help/app/extra/trash.desktop" "$desktop_dir/trash.desktop"
        chown $user:users "$desktop_dir/trash.desktop"
    fi
    if test ! -e "$desktop_dir/Home.desktop"; then
        cp -f "/opt/regataos-help/app/extra/Home.desktop" "$desktop_dir/Home.desktop"
        chown $user:users "$desktop_dir/Home.desktop"
    fi

    # Remove some files so that the configuration of the graphical environment is restored to the default
    rm -f /home/$user/.config/*rc
    rm -f /home/$user/.config/kdeglobals

    # Restore some files and folders that are standard
    tar xf /opt/regataos-help/clean_home_directory.tar.xz -C /home/$user/

    # Make sure the user is the owner of the files in your home and restart the system
    chown $user:users /home/$user/.*

    # Revert any changes that have taken place at the root of the system to the default
    cp -f /opt/regataos-help/scripts/regataos-update.sh /usr/share/regataos/regataos-update.sh

    sleep 1
    sudo reboot

else
    echo "Process canceled"
fi
