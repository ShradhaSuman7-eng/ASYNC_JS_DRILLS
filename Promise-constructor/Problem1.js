/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require("fs");

const path = require("path");
const folderName = "FOLDER";


const createDirectory = () => {
  return new Promise((resolve, reject) => {
    fs.mkdir(folderName, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory:", err);
        reject(err);
    } else {
        console.log("Directory created successfully!");
        resolve();
    }
    });
  });
};

let randomNumber = Math.floor(Math.random() * 10) + 1;

function addFiles() {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < randomNumber; i++) {
      const filePath = path.join(folderName+`file${i + 1}.json`);
      fs.writeFile(filePath, "{}", (err) => {
        if (err) {
            console.error(`Error writing file ${filePath}:`, err);
            reject(err);
        } else {
            console.log(`File created: ${filePath}`);
            resolve();
        }
    });;
    }
  });
}


function deleteFile(){
  return new Promise ((resolve,reject)=>{
    for(let i=0;i<randomNumber;i++){
        const filePath=path.join(folderName+`file${i+1}.json`);
        fs.unlink(filePath,(err)=>{
            if(err){
              console.log("Error ")
                reject(err)
            }
            else{
              console.log("Deleting files")

                resolve()

            }
        })
    }
  })
}



module.exports={createDirectory,addFiles,deleteFile}