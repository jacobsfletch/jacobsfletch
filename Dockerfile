############################################################
# Dockerfile to build Node App
# Based on node
############################################################

FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY app/package.json /usr/src/app/
RUN npm install
RUN npm install pm2 -g

# Install services
RUN apt-get update
RUN apt-get install -y vim python-pip python-dev build-essential
RUN pip install --upgrade pip &&\
    pip install --upgrade virtualenv &&\
    pip install awscli

# Bundle app source
ADD app/ /usr/src/app

EXPOSE 3000

CMD pm2-docker processes.json
