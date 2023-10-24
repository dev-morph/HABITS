#!/bin/bash
DEPLOY_PATH=/app/habits
cd $DEPLOY_PATH
docker compose up --build -d backend frontend