const fs = require("fs");
// synchronous
/*

function readFile() {
  const data = fs.readFileSync("file.txt", "utf8"); // Blocks execution
  console.log(data);
}

console.log("Before reading file");
readFile();
console.log("After reading file");
*/
// async reading
function readFile() {
  const data = fs.readFile("file.txt", "utf-8");
  console.log(data);
}

console.log("before");
readFile();
console.log("after");
