#!/bin/bash

host=${HOST:-ec2-54-93-62-192.eu-central-1.compute.amazonaws.com}
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

rsync -avr --exclude node_modules $DIR/ ubuntu@${host}:/mofi/backend
