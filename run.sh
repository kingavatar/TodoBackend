#!/bin/bash
echo "$ENV"
if [ "$ENV" = "PROD" ]
    then
        npm run start
else
        npm run dev
fi
