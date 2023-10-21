# BASE
BASE_DIR_NAME="HABITS"
IMAGE_PREFIX="habits_"
PACKAGE_NAME="installPackage"

cd ../
mkdir $PACKAGE_NAME
tar -czvf ./$PACKAGE_NAME.tar.gz ./$BASE_DIR_NAME

mv ./$PACKAGE_NAME.tar.gz ./$BASE_DIR_NAME
rm -rf $PACKAGE_NAME