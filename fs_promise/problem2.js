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
  return fs.readFile(file, "utf8");
}

function writeFileContent(file, content) {
  return fs.writeFile(file, content);
}

function appendToFile(file, content) {
  return fs.appendFile(file, content + "\n");
}

function deleteFile(file) {
  return fs.unlink(file);
}

function writeLipsum() {
  return writeFileContent(
    inputFile,
    `corem ipsum dolor, sit amet consectetur adipisicing elit. 
Rerum numquam ab aliquid sunt veniam officiis maiores? Voluptatum eum numquam debitis,
ea impedit unde sit ullam dolores? Facilis pariatur nesciunt minus.
Mollitia, quasi voluptatibus, offici FACILIS PARIATUR NESCIUNT MINUS.
MOLLITIA, QUASI VOLUPTATIBUS, OFFICIA BEATAE VOLUPTATEM EA MAXIME DESERUNT 
ACCUSANTIUM HIC NOBIS FACERE REM CONSEQUATUR EUM ASPERIORES DOLORIBUS! 
eROR LABORUM EXERCITATIONEM DOLORE DUCIMUS ANIMI, PLACEAT CONSEQUUNTUR REPREHENDERIT ESSE EVENIET COMMODI.
fOLOREMQUE NUMQUAM, SAPIENTE QUISQUAM MINUS IPSA SEQUI REICIENDIS TEMPORE, consequuntur reprehenderit esse eveniet commodi.
doloremque numquam, sapiente quisquam minus ipsa sequi reiciendis tempore,
fepellendus, quas architecto deleniti beatae voluptate iste error illum voluptatum. `
  );
}

function readLipsum() {
  return readFileContent(inputFile);
}

function processUpperCase() {
  return readFileContent(inputFile)
    .then((data) => {
      const upperCaseContent = data.toUpperCase();
      console.log("Content converted to uppercase.");

      return writeFileContent("uppercase.txt", upperCaseContent);
    })
    .then(() => {
      console.log("Uppercase content written to uppercase.txt.");
      return appendToFile(filenamesFile, "uppercase.txt");
    })
    .then(() => console.log("uppercase.txt added to filenames.txt."))
    .catch((err) => console.error("Error processing uppercase content:", err));
}


// Read the new file and convert it to lower case. Then split the contents into sentences.
//  Then write it to a new file. Store the name of the new file in filenames.txt

function convertToLowerCase() {
  return readFileContent(inputFile)
    .then((data) => {
      const lowerCaseContent = data.toLowerCase().split(".").join("\n");
      console.log("Content converted to lowercase and split into sentences.");

      return writeFileContent("lowerCase.txt", lowerCaseContent);
    })
    .then(() => {
      console.log("Lowercase content written to lowerCase.txt.");
      return appendToFile(filenamesFile, "lowerCase.txt");
    })
    .then(() => console.log("lowerCase.txt added to filenames.txt."))
    .catch((err) => console.error("Error processing lowercase content:", err));
}

//  4. Read the new files, sort the content,
//  write it out to a new file. Store the name of the new file in filenames.txt

function sortContent() {
  console.log("Reading lipsum.txt and sorting content...");
  return readFileContent("lipsum.txt").then((data) => {
    const sortedContent = data.split("\n").sort().join("\n");
    return writeFileContent("sortedData.txt", sortedContent)
      .then(() => {
        console.log("Sorted content written to sortedData.txt");
        return appendToFile(filenamesFile, "sortedData.txt");
      })
      .then(() => console.log("sortedData.txt added to filenames.txt"));
  });
}

//5. Read the contents of filenames.
// txt and delete all the new files that are mentioned in that list simultaneously.

function deleteProcessedFiles() {
  return readFileContent(filenamesFile)
    .then((data) => {
      const filesToDelete = data.split("\n").filter((ele) => ele.length > 0);
      return Promise.all(filesToDelete.map((file) => deleteFile(file)));
    })
    .then(() => deleteFile(filenamesFile))
    .then(() => deleteFile(inputFile))
    .then(() => console.log("All files successfully deleted!"))
    .catch((err) => console.error("Error during file deletion:", err));
}

module.exports = {
  writeLipsum,
  readLipsum,
  processUpperCase,
  convertToLowerCase,
  sortContent,
  deleteProcessedFiles,
};
