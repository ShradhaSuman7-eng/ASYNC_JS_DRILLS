/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require("fs").promises;
const path = require("path");

let folderName = "FOLDER";
let randomNumber = Math.floor(Math.random() * 10 + 1);

function createFolder() {
  return fs.mkdir(folderName, { recursive: true });
}


function addFiles() {
  console.log("Adding files...");

  let filePromises = [];
  for (let i = 0; i < randomNumber; i++) {
    const filePath = path.join(folderName, `file${i + 1}.json`);
    filePromises.push(fs.writeFile(filePath, "{}").then(() => filePath));
  }

  return Promise.all(filePromises)
    .then((filePaths) => {
      console.log("All files created.");

      let deletePromises = filePaths.map((filePath) => fs.unlink(filePath));
      return Promise.all(deletePromises);
    })
    .then(() => {
      console.log("All files deleted.");
    });
}


module.exports = { createFolder, addFiles };