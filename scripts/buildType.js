const path = require("path");
const fs = require("fs");

// 遍历目录的函数
function readDirRecursive(dirPath){
  let results = [];
  // 读取目录内容
  const list = fs.readdirSync(dirPath);
  list.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      // 如果是目录，则递归遍历
      results = results.concat(readDirRecursive(filePath));
    } else {
      // 如果是文件，则添加到结果列表
      results.push(filePath);
    }
  });
  return results;
}
function toUnixPath(filePath) {
  return filePath.replace(/\\/g, '/');
}
const directoryPath = path.resolve(__dirname, '../dist/types');
const files = readDirRecursive(directoryPath);
files.forEach(item=>{
  const template = "import\"./types" + toUnixPath(item).split("types")[1] + "\";"
  fs.appendFileSync(path.resolve(__dirname,"../dist/index.d.ts"),template,"utf-8")
})
