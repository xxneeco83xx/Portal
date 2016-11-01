@echo off
start mongo.bat
ping -n 3 localhost>nul
start node.bat