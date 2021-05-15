#!/bin/bash

apt-get -qq update
apt-get -qq -y install curl

# # echo "VUE_APP_URL = $(curl http://169.254.169.254/latest/meta-data/public-ipv4):3000" > /etc/environment

echo "APP_URL = $(curl http://169.254.169.254/latest/meta-data/public-ipv4):3000" > /etc/environment


if [ "$ENV" = "PROD" ]
    then
        npm run start
else
        npm run dev
fi
