cd front/src/
rm -rf comment
mkdir comment
cp -r product/* comment/
cd comment
find . -name "*Product*.js" -exec rename 's/Product/Comment/' {} ";"
find . -type f -name "*.js" -print0 | xargs -0 sed -i '' -e 's/Products/Comments/g'
find . -type f -name "*.js" -print0 | xargs -0 sed -i '' -e 's/Product/Comment/g'
find . -type f -name "*.js" -print0 | xargs -0 sed -i '' -e 's/products/comments/g'
find . -type f -name "*.js" -print0 | xargs -0 sed -i '' -e 's/product/comment/g'
