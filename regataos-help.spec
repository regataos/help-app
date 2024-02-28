Name: regataos-help
Version: 7.0
Release: 0
Url: https://github.com/regataos/help-app
Summary: Problems solution of Regata OS
Group: System/GUI/KDE
BuildRequires: desktop-file-utils
BuildRequires: update-desktop-files
BuildRequires: hicolor-icon-theme
BuildRequires: -post-build-checks
BuildRequires: systemd
BuildRequires: grep
%{?systemd_requires}
Requires: xz
Requires: magma
Requires: retry
Requires: regataos-base >= 24
License: MIT
Source1: regataos-help-%{version}.tar.xz
Source2: clean_home_directory.tar.xz
BuildRoot: %{_tmppath}/%{name}-%{version}-build

%description
Center of problems solution of Regata OS.

%build

%install
mkdir -p %{buildroot}/opt/regataos-base/
cp -f %{SOURCE1} %{buildroot}/opt/regataos-base/regataos-help-%{version}.tar.xz

mkdir -p %{buildroot}/opt/regataos-help/
cp -f %{SOURCE2} %{buildroot}/opt/regataos-help/clean_home_directory.tar.xz

%post
if test -e /opt/regataos-base/regataos-help-%{version}.tar.xz ; then
	tar xf /opt/regataos-base/regataos-help-%{version}.tar.xz -C /
fi

if test -e "/opt/magma/nw"; then
	rm -f "/opt/magma/regataoshelp"
	cp -f "/opt/magma/nw" "/opt/magma/regataoshelp"
fi

if test ! -e "/usr/bin/regataoshelp"; then
	ln -s "/opt/magma/regataoshelp" "/usr/bin/regataoshelp"
fi

# Set the graphical interface language according to user settings
# and update desktop database
systemctl stop regataos-help-select-language.service
systemctl disable regataos-help-select-language.service
systemctl daemon-reload

update-desktop-database

%clean

%files
%defattr(-,root,root)
/opt/regataos-base/regataos-help-%{version}.tar.xz
/opt/regataos-help/clean_home_directory.tar.xz

%changelog
