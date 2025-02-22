/* Problem 2:
    
Using callbacks and the fs module's asynchronous functions, do the following:
    1. Read the given file lipsum.txt
    2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
    3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
    4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
    5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
    
    */

const fs = require("fs").promises;

const inputFile = "lipsum.txt";
const filenamesFile = "filenames.txt";

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf8").then(resolve).catch(reject);
    });
}

function writeFileContent(file, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, content).then(() => resolve(file)).catch(reject);
    });
}

function appendToFile(file, content) {
    return new Promise((resolve, reject) => {
        fs.appendFile(file, content + "\n").then(resolve).catch(reject);
    });
}

function deleteFile(file) {
    return new Promise((resolve, reject) => {
        fs.unlink(file).then(resolve).catch(reject);
    });
}

function writeLipsum() {
    return writeFileContent(inputFile, `corem ipsum dolor, sit amet consectetur adipisicing elit.\nRerum numquam ab aliquid sunt veniam officiis maiores?`);
}

function readLipsum() {
    return readFileContent(inputFile);
}

function processUpperCase() {
    return new Promise((resolve, reject) => {
        readFileContent(inputFile)
            .then((data) => {
                const upperCaseContent = data.toUpperCase();
                return writeFileContent("uppercase.txt", upperCaseContent);
            })
            .then(() => appendToFile(filenamesFile, "uppercase.txt"))
            .then(() => {
                console.log("Uppercase conversion completed.");
                resolve();
            })
            .catch(reject);
    });
}

function convertToLowerCase() {
    return new Promise((resolve, reject) => {
        readFileContent(inputFile)
            .then((data) => {
                const lowerCaseContent = data.toLowerCase().split(".").join("\n");
                return writeFileContent("lowerCase.txt", lowerCaseContent);
            })
            .then(() => appendToFile(filenamesFile, "lowerCase.txt"))
            .then(() => {
                console.log("Lowercase conversion completed.");
                resolve();
            })
            .catch(reject);
    });
}

function sortContent() {
    return new Promise((resolve, reject) => {
        readFileContent(inputFile)
            .then((data) => {
                const sortedContent = data.split("\n").sort().join("\n");
                return writeFileContent("sortedData.txt", sortedContent);
            })
            .then(() => appendToFile(filenamesFile, "sortedData.txt"))
            .then(() => {
                console.log("Sorting completed.");
                resolve();
            })
            .catch(reject);
    });
}

function deleteProcessedFiles() {
    return new Promise((resolve, reject) => {
        readFileContent(filenamesFile)
            .then((data) => {
                const filesToDelete = data.split("\n").filter((ele) => ele.length > 0);
                return Promise.all(filesToDelete.map(deleteFile));
            })
            .then(() => deleteFile(filenamesFile))
            .then(() => deleteFile(inputFile))
            .then(() => {
                console.log("All processed files deleted.");
                resolve();
            })

            .catch(reject);
    });
}

module.exports = { writeLipsum, processUpperCase, convertToLowerCase, sortContent, deleteProcessedFiles };
