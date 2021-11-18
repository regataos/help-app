#!/bin/sh

sudo -H env DISPLAY=:0 zenity --question --text "Instalar também atualizações de softwares, caso estejam disponíveis?" --title "Atualizar repositórios e softwares" --ok-label "Sim" --cancel-label "Não" --width 300
if [ $? -eq "0" ]
then
	# Download
	if test -e /usr/share/regataos/enterprise-iso.txt ; then
		wget --no-check-certificate -O /tmp/apps-scripts/regataos-repo-nt.tar.xz https://master.dl.sourceforge.net/project/regataos/repos/regataos-repo-nt.tar.xz 2>&1 | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 --text "Baixando arquivos. Espere um momento..." --title "Atualizando os repositórios de software" --auto-close --auto-kill --no-cancel

	else
		wget --no-check-certificate -O /tmp/apps-scripts/regataos-repo-st.tar.xz https://master.dl.sourceforge.net/project/regataos/repos/regataos-repo-st.tar.xz 2>&1 | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 --text "Baixando arquivos. Espere um momento..." --title "Atualizando os repositórios de software" --auto-close --auto-kill --no-cancel
	fi

	# Extract files
	if test -e /usr/share/regataos/enterprise-iso.txt ; then
		sudo tar xf /tmp/apps-scripts/regataos-repo-nt.tar.xz -C /
	else
		sudo tar xf /tmp/apps-scripts/regataos-repo-st.tar.xz -C /
	fi

	sudo pkcon --noninteractive refresh | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 --text "Atualizando os repositórios de software manualmente..." --title "Atualizando os repositórios de software" --auto-close --auto-kill --no-cancel
	echo fixrepos > /tmp/apps-scripts/fix-repos.txt

	sudo pkcon --noninteractive update | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 --text "Buscando e instalando atualizações de softwares..." --title "Atualizando softwares" --auto-close --auto-kill --no-cancel

	# Clear
	sudo rm -f /tmp/apps-scripts/regataos-repo-*.tar.xz

else
	# Download
	if test -e /usr/share/regataos/enterprise-iso.txt ; then
		wget --no-check-certificate -O /tmp/apps-scripts/regataos-repo-nt.tar.xz https://master.dl.sourceforge.net/project/regataos/repos/regataos-repo-nt.tar.xz 2>&1 | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 --text "Baixando arquivos. Espere um momento..." --title "Atualizando os repositórios de software" --auto-close --auto-kill --no-cancel

	else
		wget --no-check-certificate -O /tmp/apps-scripts/regataos-repo-st.tar.xz https://master.dl.sourceforge.net/project/regataos/repos/regataos-repo-st.tar.xz 2>&1 | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 --text "Baixando arquivos. Espere um momento..." --title "Atualizando os repositórios de software" --auto-close --auto-kill --no-cancel
	fi

	# Extract files
	if test -e /usr/share/regataos/enterprise-iso.txt ; then
		sudo tar xf /tmp/apps-scripts/regataos-repo-nt.tar.xz -C /
	else
		sudo tar xf /tmp/apps-scripts/regataos-repo-st.tar.xz -C /
	fi

	sudo pkcon --noninteractive refresh | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 --text "Atualizando os repositórios de software manualmente..." --title "Atualizando os repositórios de software" --auto-close --auto-kill --no-cancel

	# Clear
	sudo rm -f /tmp/apps-scripts/regataos-repo-*.tar.xz
	echo fixrepos > /tmp/apps-scripts/fix-repos.txt
fi
