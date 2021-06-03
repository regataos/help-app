%define service_name regataos-help
%define service_name2 regataos-help-selectlanguage

Name: regataos-help
Version: 5.4
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
Requires: magma >= 5.52.2-lp152.6.1
Requires: regataos-base >= 20.1.2
License: MIT
Source1: regataos-help-%{version}.tar.xz
Source2: regataos-help.service
Source3: clean_home_directory.tar.xz
BuildRoot: %{_tmppath}/%{name}-%{version}-build

%description
Center of problems solution of Regata OS.

%build

%install
mkdir -p %{buildroot}/opt/regataos-base/
cp -f %{SOURCE1} %{buildroot}/opt/regataos-base/regataos-help-%{version}.tar.xz
mkdir -p %{buildroot}%{_unitdir}
cp -f %{SOURCE2} %{buildroot}%{_unitdir}/%{service_name}.service

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

%service_add_post %{service_name}.service
systemctl enable  %{service_name}.service || true
systemctl start   %{service_name}.service || true
systemctl restart %{service_name}.service || true

%service_add_post %{service_name2}.service
systemctl enable  %{service_name2}.service || true
systemctl start   %{service_name2}.service || true
systemctl restart %{service_name2}.service || true

update-desktop-database

%clean

%files
%defattr(-,root,root)
/opt/regataos-base/regataos-help-%{version}.tar.xz
%{_unitdir}/%{service_name}.service
/opt/regataos-help/clean_home_directory.tar.xz

%changelog
