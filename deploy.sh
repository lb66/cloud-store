rm -rf build
yarn run build
cd build
git init
git add .
git commit -m "first commit"
git remote add origin git@gitee.com:lb1022/cloud-store.git
git push -f -u origin master
cd ..