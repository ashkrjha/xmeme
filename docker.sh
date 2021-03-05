#!/bin/bash
# git clone the repo
# cd to the cloned repo directory
# Create the container image, this will use the Dockerfile
sudo apt-get update -y && sudo apt-get dist-upgrade -y
sudo apt-get install -q -y -o Dpkg::Options::="--force-confdef" mysql-server;
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';"
sudo mysql -e "FLUSH PRIVILEGES;"
sudo mysql -e "SELECT user,authentication_string,plugin,host FROM mysql.user;"
sudo mysql -e "exit"
docker build -t xmeme_app .
# Run the app container on port 8081
docker run -d --net="host" xmeme_app
# Run sleep.sh
chmod +x sleep.sh
./sleep.sh
# Execute the POST /memes endpoint using curl
curl --location --request POST 'http://localhost:8081/memes' \
--header 'Content-Type: application/json' \
--data-raw '{
"name": "xyz",
"url": "abc.com",
"caption": "This is a meme"
}'
# Execute the GET /memes endpoint using curl
curl --location --request GET 'http://localhost:8081/memes'