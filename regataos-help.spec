Name: regataos-help
Version: 5.6
Release: 0
Url: https://github.com/regataos/help-app
Summary: Problems solution of Regata OS
Group: System/GUI/KDE
BuildRequires: xz
BuildRequires: desktop-file-utils
BuildRequires: update-desktop-files
BuildRequires: hicolor-icon-theme
BuildRequires: -post-build-checks
%{?systemd_requires}
BuildRequires: systemd
BuildRequires: grep
Requires: xz
Requires: magma >= 5.54.1
Requires: regataos-base >= 21.0.12
License: MIT
Source1: regataos-help-%{version}.tar.xz
Source3: clean_home_directory.tar.xz
BuildRoot: %{_tmppath}/%{name}-%{version}-build

%description
Center of problems solution of Regata OS.

%build

%install
mkdir -p %{buildroot}/opt/regataos-base/
cp -f %{SOURCE1} %{buildroot}/opt/regataos-base/regataos-help-%{version}.tar.xz

mkdir -p %{buildroot}/opt/regataos-help/
cp -f %{SOURCE3} %{buildroot}/opt/regataos-help/clean_home_directory.tar.xz

%post
if test -e /opt/regataos-base/regataos-help-%{version}.tar.xz ; then
	tar xf /opt/regataos-base/regataos-help-%{version}.tar.xz -C /
fi

if test ! -e /opt/magma/regataoshelp ; then
	cp -f /opt/magma/magma /opt/magma/regataoshelp
fi
if test ! -e /usr/bin/regataoshelp ; then
	ln -s /opt/magma/regataoshelp /usr/bin/regataoshelp
fi

# Some changes for the new version of the Regata OS Help app
if test -e "/etc/xdg/autostart/regataos-help-network.desktop"; then
	# Disable obsolete systemd services
	systemctl stop regataos-help.service || true
	systemctl disable regataos-help.service || true

	systemctl stop regataos-help-selectlanguage.service || true
	systemctl disable regataos-help-selectlanguage.service || true

	# Terminate processes that are no longer needed
	killall regataos-help-check-network.sh
	killall regataos-help-notifications.sh
	killall select-language

	# Remove obsolete autostart services
	rm -f "/etc/xdg/autostart/regataos-help-network.desktop"
	rm -f "/etc/xdg/autostart/regataos-help-notifications.desktop"
fi

# Set the graphical interface language according to user settings
/opt/regataos-help/scripts/select-language start

update-desktop-database

%clean

%files
%defattr(-,root,root)
/opt/regataos-base/regataos-help-%{version}.tar.xz
/opt/regataos-help/clean_home_directory.tar.xz

%changelog
