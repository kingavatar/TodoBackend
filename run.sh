#!/bin/bash
# APP URL
# frontend build
# move f build to backend

if [ "$ENV" = "PROD" ]
    then
        npm run start
else
        npm run dev
fi
