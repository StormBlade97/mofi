#!/bin/bash

host=${HOST:-ec2-54-93-62-192.eu-central-1.compute.amazonaws.com}
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

(cd $DIR && REACT_APP_BACKEND_API="https://elisa.hackback.tech/api" npm run build)
rsync -avr $DIR/build/ ubuntu@${host}:/mofi/frontend
