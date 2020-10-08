#!/bin/bash firefox "$1"

sudo systemctl start mysqld.service
sudo systemctl start httpd.service


cd r-server
node index.js

cd ../rolline
npm run server


