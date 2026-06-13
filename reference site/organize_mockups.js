const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'public/assets');

function getAllAssets(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllAssets(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}

const allAssets = getAllAssets(assetsDir);
const imageAssets = allAssets.filter(a => a.endsWith('.png') || a.endsWith('.jpg') || a.endsWith('.jpeg') || a.endsWith('.svg'));

console.log("Remaining Image Assets:");
imageAssets.forEach(a => console.log(a.replace(assetsDir, '')));
