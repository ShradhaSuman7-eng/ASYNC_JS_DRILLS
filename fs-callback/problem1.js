/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require("fs");
const path = require("path");

const folderName = "FOLDER";

function createDirectory(callback) {
  console.log("Creating Directory...");
  fs.mkdir(folderName, { recursive: true }, (err) => {
    if (err) {
      console.log("Error creating directory:", err);
    } else {
      console.log("Directory created.");
      callback();
    }
  });
}

const randomNumber = Math.floor(Math.random() * 10) + 1;

function addFiles(callback) {
  console.log("Adding files...");
  for (let i = 0; i < randomNumber; i++) {
    const filePath = path.join(folderName, `file${i + 1}.json`);

    fs.writeFile(filePath, "{}", (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log(`File file${i + 1}.json created.`);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting ${filePath}:`, err);
          } else {
            console.log(`Deleted file: file${i + 1}.json`);
          }
        });
      }
    });
  }
}

module.exports = { createDirectory, addFiles };
