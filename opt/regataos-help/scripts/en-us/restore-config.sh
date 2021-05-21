#!/bin/sh

sudo -H env DISPLAY=:0 zenity --question --text "Some files will also be deleted. Do you really want to restore the settings?\n\nThe system will restart automatically!" --title "Restore default settings" --ok-label "Yes" --cancel-label "Cancel" --width 300
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
        cp -f "/opt/regataos-help/extra/trash.desktop" "$desktop_dir/trash.desktop"
        chown $user:users "$desktop_dir/trash.desktop"
    fi
    if test ! -e "$desktop_dir/Home.desktop"; then
        cp -f "/opt/regataos-help/extra/Home.desktop" "$desktop_dir/Home.desktop"
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
