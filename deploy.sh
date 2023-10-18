docker compose down
IMAGE_LIST=$(docker images | grep $IMAGE_PREFIX | awk '{print $1":"$2}')
# 기존 image 삭제
docker rmi $IMAGE_LIST
docker load --input /app/habits/habits_images.tar
docker compose up -d