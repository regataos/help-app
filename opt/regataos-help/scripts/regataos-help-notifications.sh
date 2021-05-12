#!/bin/bash

cd /

while :
do

ps -C regataoshelp > /dev/null

if [ $? = 0 ]
then

lang=$(grep -r LANG $HOME/.config/plasma-localerc)

if [[ $lang == *"pt_BR"* ]]; then
    if test -e /tmp/apps-scripts/fix-repos.txt ; then
        notify-send -i state-ok -t 13000 -u normal -a 'Regata OS Help' "Repositórios de software atualizados!" "Os repositórios de software foram atualizados."
        rm -f /tmp/apps-scripts/fix-repos.txt
    fi

elif [[ $lang == *"pt_PT"* ]]; then
    if test -e /tmp/apps-scripts/fix-repos.txt ; then
        notify-send -i state-ok -t 13000 -u normal -a 'Regata OS Help' "Repositórios de software atualizados!" "Os repositórios de software foram atualizados."
        rm -f /tmp/apps-scripts/fix-repos.txt
    fi

elif [[ $lang == *"en_US"* ]]; then
    if test -e /tmp/apps-scripts/fix-repos.txt ; then
        notify-send -i state-ok -t 13000 -u normal -a 'Regata OS Help' "Updated software repositories!" "The software repositories have been updated."
        rm -f /tmp/apps-scripts/fix-repos.txt
    fi

else
    if test -e /tmp/apps-scripts/fix-repos.txt ; then
        notify-send -i state-ok -t 13000 -u normal -a 'Regata OS Help' "Updated software repositories!" "The software repositories have been updated."
        rm -f /tmp/apps-scripts/fix-repos.txt
    fi
fi

fi

   sleep 2
done
