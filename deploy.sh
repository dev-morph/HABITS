#!/bin/bash
DEPLOY_PATH=/app/habits
cd $DEPLOY_PATH
docker compose up --build backend frontend -d