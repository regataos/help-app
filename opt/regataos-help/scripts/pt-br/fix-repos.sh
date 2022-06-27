#!/bin/sh

sudo -H env DISPLAY=:0 zenity --question --text "Instalar também atualizações de softwares, caso estejam disponíveis?" --title "Atualizar repositórios e softwares" --ok-label "Sim" --cancel-label "Não" --width 300
if [ $? -eq "0" ]
then
	# Download
	wget --no-check-certificate -O /tmp/apps-scripts/regataos-repo-22.tar.xz \
		https://master.dl.sourceforge.net/project/regataos/repos/regataos-repo-22.tar.xz 2>&1 | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 --text "Baixando arquivos. Espere um momento..." --title "Atualizando os repositórios de software" --auto-close --auto-kill --no-cancel

	# Extract files
	sudo tar xf /tmp/apps-scripts/regataos-repo-22.tar.xz -C /

	sudo pkcon --noninteractive refresh | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 --text "Atualizando os repositórios de software manualmente..." --title "Atualizando os repositórios de software" --auto-close --auto-kill --no-cancel
	echo fixrepos > /tmp/apps-scripts/fix-repos.txt

	sudo pkcon --noninteractive update | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 --text "Buscando e instalando atualizações de softwares..." --title "Atualizando softwares" --auto-close --auto-kill --no-cancel

	# Clear
	sudo rm -f /tmp/apps-scripts/regataos-repo-*.tar.xz

else
	# Download
	wget --no-check-certificate -O /tmp/apps-scripts/regataos-repo-22.tar.xz \
		https://master.dl.sourceforge.net/project/regataos/repos/regataos-repo-22.tar.xz 2>&1 | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 --text "Baixando arquivos. Espere um momento..." --title "Atualizando os repositórios de software" --auto-close --auto-kill --no-cancel

	# Extract files
	sudo tar xf /tmp/apps-scripts/regataos-repo-22.tar.xz -C /

	sudo pkcon --noninteractive refresh | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 --text "Atualizando os repositórios de software manualmente..." --title "Atualizando os repositórios de software" --auto-close --auto-kill --no-cancel

	# Clear
	sudo rm -f /tmp/apps-scripts/regataos-repo-*.tar.xz
	echo fixrepos > /tmp/apps-scripts/fix-repos.txt
fi
