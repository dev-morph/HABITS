# BASE VARIABLES
IMAGE_PREFIX="habits_"

IMAGE_LIST=$(docker images | grep $IMAGE_PREFIX | awk '{print $1":"$2}')

for imgName in $IMAGE_LIST
do
	echo $imgName
done

docker save -o habits_images.tar $IMAGE_LIST