#!/bin/bash

if test -e /opt/regataos-base/regataos-base-20.tar.xz ; then
  tar xf /opt/regataos-base/regataos-base-20.tar.xz -C /
fi

if test -e /usr/share/regataos/enterprise-iso.txt ; then
  if test -e /opt/regataos-base/regataos-base-nt-20.tar.xz ; then
    tar xf /opt/regataos-base/regataos-base-nt-20.tar.xz -C /
  fi
fi

if [[ $(rpm -q calamares) != *"x86"* ]]; then
  if test -e /usr/share/regataos/enterprise-iso.txt ; then
    sed -i "s/Autolock=false/Autolock=true/" /etc/xdg/kscreenlockerrc
  fi
fi

if test -e /opt/regataos-base/libcrypto.so.10-and-libssl.so.10.tar.xz ; then
  tar xf /opt/regataos-base/libcrypto.so.10-and-libssl.so.10.tar.xz -C /usr/local/lib64/
fi

if test -e /opt/regataos-base/inputattach-1.6.1.tar.xz ; then
  tar xf /opt/regataos-base/inputattach-1.6.1.tar.xz -C /
fi

if test -e /usr/share/libreoffice/share/config/images_breeze.zip ; then
    rm -f /usr/share/libreoffice/share/config/images_galaxy.zip
    ln -s /usr/share/libreoffice/share/config/images_breeze.zip /usr/share/libreoffice/share/config/images_galaxy.zip
fi

if test -e /usr/share/icons/breeze-dark/apps/48/libreoffice-startcenter.svg ; then
  rm -f /usr/share/icons/breeze-dark/apps/48/libreoffice-startcenter.svg
fi

if test -e /usr/share/icons/breeze/apps/48/libreoffice-startcenter.svg ; then
  rm -f /usr/share/icons/breeze/apps/48/libreoffice-startcenter.svg
fi

if test -e /usr/share/applications/YaST2/sw_single.desktop ; then
  rm -f /usr/share/applications/YaST2/sw_single.desktop
fi

if test -e /usr/share/wallpapers/openSUSEdefault ; then
  rm -rf /usr/share/wallpapers/openSUSEdefault
fi

if test -e /usr/share/plasma/look-and-feel/org.openSUSE ; then
  rm -rf /usr/share/plasma/look-and-feel/org.openSUSE
fi

if test -e /usr/share/plasma/layout-templates/org.opensuse.desktop.defaultPanel ; then
  rm -rf /usr/share/plasma/layout-templates/org.opensuse.desktop.defaultPanel
fi

if test -e /usr/share/plasma/layout-templates/org.kde.plasma.desktop.defaultPanel ; then
  rm -rf /usr/share/plasma/layout-templates/org.kde.plasma.desktop.defaultPanel
fi

if [[ $(grep -r "NoDisplay=true" "/usr/share/applications/org.opensuse.yast.Packager.desktop") != *"NoDisplay=true"* ]]; then
	echo "NoDisplay=true" >> "/usr/share/applications/YaST2/org.opensuse.yast.Snapper.desktop"
	echo "NoDisplay=true" >> "/usr/share/applications/YaST2/org.opensuse.yast.CheckMedia.desktop"
	echo "NoDisplay=true" >> "/usr/share/applications/YaST2/org.opensuse.yast.SWSingle.desktop"
	echo "NoDisplay=true" >> "/usr/share/applications/YaST2/org.opensuse.yast.SWSource.desktop"
	echo "NoDisplay=true" >> "/usr/share/applications/YaST2/org.opensuse.yast.OnlineUpdate.desktop"
	echo "NoDisplay=true" >> "/usr/share/applications/org.opensuse.yast.Packager.desktop"
	echo "NoDisplay=true" >> "/usr/share/applications/mintstick-kde.desktop"
fi

sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kickoff/metadata.desktop
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kickoff/metadata.json
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kickoff/contents/config/config.qml
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kickoff/contents/config/main.xml

sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kickerdash/metadata.desktop
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kickerdash/metadata.json

sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kicker/metadata.desktop
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kicker/metadata.json
sed -i 's/kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kicker/contents/config/config.qml
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kicker/contents/config/main.xml

if test -e /opt/regataos-base/update-notify ; then
  rm -f /opt/regataos-base/update-notify
fi

chown root:root /etc/sudoers
chmod 600 /etc/sudoers

chown root:root /usr
chown root:root /usr/lib
chown root:root /usr/share
chown root:root /usr/share/applications

systemctl enable firewalld.service || true
systemctl start firewalld.service || true

for zone in public internal; do
    firewall-cmd --permanent --zone=$zone --add-service={kdeconnect-kde,samba,samba-client,ipp,ipp-client,mdns}
done
firewall-cmd --reload

cupsctl --remote-admin --remote-any --share-printers --user-cancel-any
systemctl restart cups

if test ! -e /etc/ssl/certs/ca-certificates.crt ; then
	mkdir -p /etc/ssl/certs/
	ln -s /etc/ssl/ca-bundle.pem /etc/ssl/certs/ca-certificates.crt
	ln -s /etc/ssl/ca-bundle.pem /etc/ssl/certs/ca-bundle.crt
fi

if test ! -e /etc/pki/tls/certs/ca-bundle.crt ; then
	mkdir -p /etc/pki/tls/certs
	ln -s /etc/ssl/ca-bundle.pem /etc/pki/tls/certs/ca-certificates.crt
	ln -s /etc/ssl/ca-bundle.pem /etc/pki/tls/certs/ca-bundle.crt
fi

if test -e /usr/share/applications/YaST2/live-installer.desktop ; then
	echo "In Live Mode"

	echo "" >> /etc/sudoers
	echo "visitante ALL=NOPASSWD: ALL" >> /etc/sudoers
fi

clean_gpu_configs() {
    local confs=("20-amdgpu.conf" "20-radeon.conf" "20-intel.conf" "20-nvidia.conf")
    local dirs=("/etc/X11/xorg.conf.d" "/usr/share/X11/xorg.conf.d")
    for dir in "${dirs[@]}"; do
        for conf in "${confs[@]}"; do
            rm -f "$dir/$conf"
        done
    done
}

install_gpu_config() {
    local src="/usr/share/regataos/gpu/$1"
    cp -f "$src" "/etc/X11/xorg.conf.d/$1"
    cp -f "$src" "/usr/share/X11/xorg.conf.d/$1"
}

device=$(inxi -G | egrep -i "Card-2|Device-2")

if echo "$device" | grep -qiE "AMD|ATI|NVIDIA|GeForce|Intel"; then
    clean_gpu_configs
else
    driver=$(lshw -class display)
    clean_gpu_configs

    if echo "$driver" | grep -qE "driver=(intel|i915|i965|iris)"; then
        install_gpu_config "20-intel.conf"
    elif echo "$driver" | grep -q "driver=nvidia"; then
        install_gpu_config "20-nvidia.conf"
    elif echo "$driver" | grep -q "driver=amdgpu"; then
        install_gpu_config "20-amdgpu.conf"
    else
        echo "ERROR: Unsupported VGA controller"
    fi
fi

if test -e "/usr/share/regataos/nvidia-installer-disable-nouveau.conf"; then
	cp -f /usr/share/regataos/nvidia-installer-disable-nouveau.conf /etc/modprobe.d/nvidia-installer-disable-nouveau.conf
fi

if test ! -e "/tmp/regataos-prime"; then
  	mkdir -p /tmp/regataos-prime
fi
chmod 777 /tmp/regataos-prime

fix_pulse=$(cat /etc/pulse/system.pa)
if [[ $fix_pulse != *"load-module module-allow-passthrough"* ]]; then
	echo "load-module module-allow-passthrough" >> /etc/pulse/system.pa
fi

if test ! -e /run/rootfsbase ; then
	sudo ln -s / /run/rootfsbase
fi

rm -f /usr/share/regataos/regataos-update.sh
