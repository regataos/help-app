#!/bin/bash

# Update default settings
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

# Hide YaST .desktop files
if [[ $(grep -r "NoDisplay=true" "/usr/share/applications/org.opensuse.yast.Packager.desktop") != *"NoDisplay=true"* ]]; then
	echo "NoDisplay=true" >> "/usr/share/applications/YaST2/org.opensuse.yast.Snapper.desktop"
	echo "NoDisplay=true" >> "/usr/share/applications/YaST2/org.opensuse.yast.CheckMedia.desktop"
	echo "NoDisplay=true" >> "/usr/share/applications/YaST2/org.opensuse.yast.SWSingle.desktop"
	echo "NoDisplay=true" >> "/usr/share/applications/YaST2/org.opensuse.yast.SWSource.desktop"
	echo "NoDisplay=true" >> "/usr/share/applications/YaST2/org.opensuse.yast.OnlineUpdate.desktop"
	echo "NoDisplay=true" >> "/usr/share/applications/org.opensuse.yast.Packager.desktop"
	echo "NoDisplay=true" >> "/usr/share/applications/mintstick-kde.desktop"
fi

# Configure icone menu kickoff
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kickoff/metadata.desktop
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kickoff/metadata.json
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kickoff/contents/config/config.qml
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kickoff/contents/config/main.xml
# Configure icone menu kickerdash
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kickerdash/metadata.desktop
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kickerdash/metadata.json
# Configure icone menu kicker
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kicker/metadata.desktop
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kicker/metadata.json
sed -i 's/kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kicker/contents/config/config.qml
sed -i 's/start-here-kde/suse/' /usr/share/plasma/plasmoids/org.kde.plasma.kicker/contents/config/main.xml

# Disable btrfs quota for /
# sudo btrfs quota disable /

#remove update-notify
if test -e /opt/regataos-base/update-notify ; then
  rm -f /opt/regataos-base/update-notify
fi

chown root:root /etc/sudoers
chmod 600 /etc/sudoers

chown root:root /usr
chown root:root /usr/lib
chown root:root /usr/share
chown root:root /usr/share/applications

# Configure firewalld
systemctl enable firewalld.service || true
systemctl start firewalld.service || true

firewall-cmd --permanent --zone=public --add-service=kdeconnect-kde
firewall-cmd --permanent --zone=public --add-service={samba,samba-client}
firewall-cmd --permanent --zone=public --add-service=ipp
firewall-cmd --permanent --zone=public --add-service=ipp --permanent
firewall-cmd --permanent --zone=public --add-service=ipp-client
firewall-cmd --permanent --zone=public --add-service=ipp-client --permanent
firewall-cmd --permanent --zone=public --add-service=samba
firewall-cmd --permanent --zone=public --add-service=samba --permanent
firewall-cmd --permanent --zone=public --add-service=mdns
firewall-cmd --permanent --zone=public --add-service=mdns --permanent

firewall-cmd --permanent --zone=internal --add-service=kdeconnect-kde
firewall-cmd --permanent --zone=internal --add-service={samba,samba-client}
firewall-cmd --permanent --zone=internal --add-service=ipp
firewall-cmd --permanent --zone=internal --add-service=ipp --permanent
firewall-cmd --permanent --zone=internal --add-service=ipp-client
firewall-cmd --permanent --zone=internal --add-service=ipp-client --permanent
firewall-cmd --permanent --zone=internal --add-service=samba
firewall-cmd --permanent --zone=internal --add-service=samba --permanent
firewall-cmd --permanent --zone=internal --add-service=mdns
firewall-cmd --permanent --zone=internal --add-service=mdns --permanent

firewall-cmd --reload

# Fix cups for printers
cupsctl --remote-admin --remote-any --share-printers --user-cancel-any
systemctl restart cups

# Correction for the game Rocket League
if test ! -e /etc/ssl/certs/ca-certificates.crt ; then
	mkdir -p /etc/ssl/certs/
	ln -s /etc/ssl/ca-bundle.pem /etc/ssl/certs/ca-certificates.crt
	ln -s /etc/ssl/ca-bundle.pem /etc/ssl/certs/ca-bundle.crt
fi

# Fix Insync and possibly other programs
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

# Detect hybrid graphics
#Detect "device 2" and configure xorg
device=$(inxi -G | egrep -i "Card-2|Device-2")

if [[ $(echo "$device") == *"AMD"* ]]; then
	rm -f "/etc/X11/xorg.conf.d/20-amdgpu.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-amdgpu.conf"
    rm -f "/etc/X11/xorg.conf.d/20-radeon.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-radeon.conf"
    rm -f "/etc/X11/xorg.conf.d/20-intel.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-intel.conf"
    rm -f "/etc/X11/xorg.conf.d/20-nvidia.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-nvidia.conf"

elif [[ $(echo "$device") == *"ATI"* ]]; then
	rm -f "/etc/X11/xorg.conf.d/20-amdgpu.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-amdgpu.conf"
    rm -f "/etc/X11/xorg.conf.d/20-radeon.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-radeon.conf"
    rm -f "/etc/X11/xorg.conf.d/20-intel.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-intel.conf"
    rm -f "/etc/X11/xorg.conf.d/20-nvidia.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-nvidia.conf"

elif [[ $(echo "$device") == *"NVIDIA"* ]]; then
	rm -f "/etc/X11/xorg.conf.d/20-amdgpu.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-amdgpu.conf"
    rm -f "/etc/X11/xorg.conf.d/20-radeon.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-radeon.conf"
    rm -f "/etc/X11/xorg.conf.d/20-intel.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-intel.conf"
    rm -f "/etc/X11/xorg.conf.d/20-nvidia.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-nvidia.conf"

elif [[ $(echo "$device") == *"GeForce"* ]]; then
	rm -f "/etc/X11/xorg.conf.d/20-amdgpu.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-amdgpu.conf"
    rm -f "/etc/X11/xorg.conf.d/20-radeon.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-radeon.conf"
    rm -f "/etc/X11/xorg.conf.d/20-intel.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-intel.conf"
    rm -f "/etc/X11/xorg.conf.d/20-nvidia.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-nvidia.conf"

elif [[ $(echo "$device") == *"Intel"* ]]; then
	rm -f "/etc/X11/xorg.conf.d/20-amdgpu.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-amdgpu.conf"
    rm -f "/etc/X11/xorg.conf.d/20-radeon.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-radeon.conf"
    rm -f "/etc/X11/xorg.conf.d/20-intel.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-intel.conf"
    rm -f "/etc/X11/xorg.conf.d/20-nvidia.conf"
    rm -f "/usr/share/X11/xorg.conf.d/20-nvidia.conf"

else
	# Detect driver and configure xorg
	driver=$(lshw -class display)

	if [[ $(echo $driver) == *"driver=intel"* ]]; then
    	rm -f "/etc/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-nvidia.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-nvidia.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-amdgpu.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-amdgpu.conf"
    	cp -f "/usr/share/regataos/gpu/20-intel.conf" "/etc/X11/xorg.conf.d/20-intel.conf"
    	cp -f "/usr/share/regataos/gpu/20-intel.conf" "/usr/share/X11/xorg.conf.d/20-intel.conf"

	elif [[ $(echo $driver) == *"driver=i915"* ]]; then
    	rm -f "/etc/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-nvidia.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-nvidia.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-amdgpu.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-amdgpu.conf"
    	cp -f "/usr/share/regataos/gpu/20-intel.conf" "/etc/X11/xorg.conf.d/20-intel.conf"
    	cp -f "/usr/share/regataos/gpu/20-intel.conf" "/usr/share/X11/xorg.conf.d/20-intel.conf"

	elif [[ $(echo $driver) == *"driver=i965"* ]]; then
    	rm -f "/etc/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-nvidia.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-nvidia.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-amdgpu.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-amdgpu.conf"
    	cp -f "/usr/share/regataos/gpu/20-intel.conf" "/etc/X11/xorg.conf.d/20-intel.conf"
    	cp -f "/usr/share/regataos/gpu/20-intel.conf" "/usr/share/X11/xorg.conf.d/20-intel.conf"

	elif [[ $(echo $driver) == *"driver=iris"* ]]; then
    	rm -f "/etc/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-nvidia.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-nvidia.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-amdgpu.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-amdgpu.conf"
    	cp -f "/usr/share/regataos/gpu/20-intel.conf" "/etc/X11/xorg.conf.d/20-intel.conf"
    	cp -f "/usr/share/regataos/gpu/20-intel.conf" "/usr/share/X11/xorg.conf.d/20-intel.conf"

	elif [[ $(echo $driver) == *"driver=nvidia"* ]]; then
    	rm -f "/etc/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-intel.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-intel.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-amdgpu.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-amdgpu.conf"
    	cp -f "/usr/share/regataos/gpu/20-nvidia.conf" "/etc/X11/xorg.conf.d/20-nvidia.conf"
    	cp -f "/usr/share/regataos/gpu/20-nvidia.conf" "/usr/share/X11/xorg.conf.d/20-nvidia.conf"

	elif [[ $(echo $driver) == *"driver=amdgpu"* ]]; then
    	rm -f "/etc/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-intel.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-intel.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-nvidia.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-nvidia.conf"
    	cp -f "/usr/share/regataos/gpu/20-amdgpu.conf" "/etc/X11/xorg.conf.d/20-amdgpu.conf"
    	cp -f "/usr/share/regataos/gpu/20-amdgpu.conf" "/usr/share/X11/xorg.conf.d/20-amdgpu.conf"

	else
    	rm -f "/etc/X11/xorg.conf.d/20-amdgpu.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-amdgpu.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-radeon.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-intel.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-intel.conf"
    	rm -f "/etc/X11/xorg.conf.d/20-nvidia.conf"
    	rm -f "/usr/share/X11/xorg.conf.d/20-nvidia.conf"
    	echo "ERROR: Unsupported VGA controller"
	fi
fi

# Fix nvidia driver
if test -e "/usr/share/regataos/nvidia-installer-disable-nouveau.conf"; then
	cp -f /usr/share/regataos/nvidia-installer-disable-nouveau.conf /etc/modprobe.d/nvidia-installer-disable-nouveau.conf
fi

# Fix directory "/tmp/regataos-prime"
if test ! -e "/tmp/regataos-prime"; then
  	mkdir -p /tmp/regataos-prime
  	chmod 777 /tmp/regataos-prime
else
  	chmod 777 /tmp/regataos-prime
fi

# Detect layout for the keyboard language and fix Firefox home page
# sed -i 's/LayoutList=br,us/LayoutList=us,br/' /etc/xdg/kxkbrc
# sed -i 's,http://www.regataos.com.br/,https://www.regataos.com.br/p/home.html,' /usr/lib64/firefox/distribution/distribution.ini

# Fix pulseaudio
fix_pulse=$(cat /etc/pulse/system.pa)
if [[ $fix_pulse != *"load-module module-allow-passthrough"* ]]; then
	echo "load-module module-allow-passthrough" >> /etc/pulse/system.pa
fi

# Fix repos
#Google
#wget --no-check-certificate -O /usr/share/regataos/linux_signing_key.pub https://dl.google.com/linux/linux_signing_key.pub
#if test -e /usr/share/regataos/linux_signing_key.pub ; then
#  zypper clean -a
#  rpm --import /usr/share/regataos/linux_signing_key.pub
#  zypper --gpg-auto-import-keys ref
#fi

# Fix for Calamares
if test ! -e /run/rootfsbase ; then
	sudo ln -s / /run/rootfsbase
fi

# Process completed, it's time to say goodbye...
rm -f /usr/share/regataos/regataos-update.sh
