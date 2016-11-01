@echo off
color f1
title Levantar server
echo Levantando MONGODB
cd %programfiles%
cd MongoDB
cd Server
cd 3.2
cd bin
mongod --dbpath %homedrive%\Database
echo Levantando NODEJS....
cd\
cd %userprofile%\Desktop
cd APP
node server.js