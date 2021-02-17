# TA9 Dashboard application

## What You Will Build

This is docker-compose project which consists of 4 containers. Two java RESTful applications which are wired by rabbitMq and client side on Angular.

## What required to run

- Docker (my current version  is 19.03.13)

- Git

## How to run

open command line and execute following commands:

**git clone https://github.com/3620849/TA9.git**

**cd TA9**

**docker-compose up**

wait until docker build and load all containers

## How to use

open your browsers and visit **localhost** (no need port to be specified)

## What you will see in browser
![alt text](https://github.com/3620849/TA9/blob/main/ta92.png)

![alt text](https://github.com/3620849/TA9/blob/main/ta91.png)
## What you should see in command line

after you run command docker-compose up you should see following output
sometimes it will take more time than expected because docker build and download containers

![alt text](https://github.com/3620849/TA9/blob/main/ta93.png)
## How does it work

diagram below describe how generally how work project

![alt text](https://github.com/3620849/TA9/blob/main/diagram.png)

userpage generate clientId and collect all info about client and send it to server with status ONLINE
this information will be stored in local memory and after server define current time and set it inside client-entity
there is scheduled task which check all entities and check how long ago entity refreshed if entity doesn't updated last 4second entity will be marked as OFFLINE

because current git repository already contains compiled jar files and angular dist folders there is no need build tools like:maven,nodejs or jdk

because angular application runs at nginx in docker container and port 80 is exposed
no need to specify port at browser


