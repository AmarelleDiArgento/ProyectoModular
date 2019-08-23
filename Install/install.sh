#!/bin/bash
sudo update-grub
sudo apt-get update
sudo apt-get upgrade

sudo wget https://download.anydesk.com/linux/anydesk_5.1.1-1_amd64.deb
sudo dpkg -i anydesk_5.1.1-1_amd64.deb 
sudo apt-get install -f

sudo apt install snapd git docker.io docker-compose -y
sudo snap install chromium
# sudo snap install node --channel=12/stable --classic
sudo add-apt-repository universe
sudo apt-get update
sudo apt-get install alien

cd bin
sudo sh setup

sudo apt update
sudo apt install mysql-server mysql-workbench nginx -y

sudo systemctl status mysql
 mysql -u root -p
sudo mysql_secure_installation

cd
git clone https://github.com/nvm-sh/nvm.git .nvm
cd .nvm
sudo sh nvm.sh
nvm install node

# sudo apt-get install npm
# sudo npm install -g npm
sudo npm install -g @angular/cli
sudo npm install -g nodemon

cd
git clone https://github.com/AmarelleDiArgento/ProyectoModular.git
mv ProyectoModular .ProyectoModular
cd .ProyectoModular/back-end
npm install
ng build

cd
cd .ProyectoModular/front-end
npm install

cd
cd .ProyectoModular

sudo gpasswd -a probocaditos docker
newgrp docker

sudo cp docker-nexus.service /etc/systemd/system/
systemctl enable docker-nexus.service

sudo docker-compose up -d
sudo docker ps








# pass:  40654140ad8dd9ee69adc02cf1f6e10f MD5: probocaditos
# sudo reboot

# sudo -i *to access root*
# grub-install --root-directory=/mnt/ /dev/sda
# sudo update-grub
# sudo grub-install /dev/sdagit








