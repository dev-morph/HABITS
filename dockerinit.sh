docker rm -f $(docker-compose ps -aq)
docker rmi $(docker images)
docker volume rm $(docker volume ls)