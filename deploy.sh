IMAGE_PREFIX="habits_"
docker compose down
IMAGE_LIST=$(docker images | grep $IMAGE_PREFIX | awk '{print $1":"$2}')
# 기존 image 삭제
docker rmi $IMAGE_LIST
docker compose up -d