#!/bin/sh

sudo -H env DISPLAY=:0 zenity --question --text "Do you really want to restore the settings?\nThe system will restart automatically." --title "Restore default settings" --ok-label "Yes" --cancel-label "Cancel" --width 300
if [ $? -eq "0" ]
then

    kmsg=$(users | cut -d ' ' -f 2-)
    echo $kmsg

    sudo rm -f /home/$kmsg/.config/plasma-org.kde.plasma.desktop-appletsrc
    sudo rm -f /home/$kmsg/.config/kdeglobals
    cp -f /etc/xdg/kdeglobals /home/$kmsg/.config/kdeglobals
    sudo rm -f /home/$kmsg/.config/kactivitymanagerd-statsrc
    sudo rm -f /home/$kmsg/.config/kactivitymanagerdrc
    sudo rm -f /home/$kmsg/.config/plasmashellrc
    sudo rm -f /home/$kmsg/.config/startupconfig
    sudo rm -f /home/$kmsg/.config/gwenviewrc
    sudo rm -f /home/$kmsg/.config/systemsettingsrc
    sudo rm -f /home/$kmsg/.config/kwinrc
    sudo rm -f /home/$kmsg/.config/dolphinrc
    sudo rm -f /home/$kmsg/.config/kwriterc

    cp -f /opt/regataos-help/scripts/regataos-update.sh /usr/share/regataos/regataos-update.sh

    sudo reboot

else
    echo "Process canceled"
fi
