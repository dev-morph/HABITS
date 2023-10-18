# BASE
IMAGE_PREFIX="habits_"
PACKAGENAME="installPackage"

mkdir ./$PACKAGENAME
cp ./docker-compose.yml ./$PACKAGENAME
cp ./appspec.yml ./$PACKAGENAME
cp ./deploy.sh ./$PACKAGENAME

IMAGE_LIST=$(docker images | grep $IMAGE_PREFIX | awk '{print $1":"$2}')

for imgName in $IMAGE_LIST
do
	echo $imgName
done

docker save -o ./$PACKAGENAME/habits_images.tar $IMAGE_LIST
cd $PACKAGENAME
tar -czvf ../$PACKAGENAME.tar.gz ./