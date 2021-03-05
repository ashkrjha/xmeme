#!/bin/bash
sudo apt-get update
sudo apt-get install -y -o Dpkg::Options::="--force-confdef" mysql-server;
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';"
sudo mysql -e "FLUSH PRIVILEGES;"
sudo apt-get -y install nodejs npm