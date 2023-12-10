#!/bin/bash
DEPLOY_PATH=/app/habits
cd $DEPLOY_PATH
docker compose up mysqldb -d
docker build --progress=plain frontend
docker build --progress=plain backend
docker compose up backend frontend -d