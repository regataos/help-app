#!/bin/sh

# Running Commands
sudo rm -f /etc/resolv.conf
sudo rm -f /etc/resolv.conf.netconfig

sudo systemctl stop network.service
sudo systemctl --force enable NetworkManager.service
sudo systemctl restart network.service
