# BASE
IMAGE_PREFIX="habits_"
PACKAGE_NAME="installPackage"
PATH_NAME=$(pwd)

echo $PATH_NAME
cd ../
mkdir $PACKAGE_NAME
tar -czvf ./$PACKAGE_NAME/$PACKAGE_NAME.tar.gz $PATH_NAME