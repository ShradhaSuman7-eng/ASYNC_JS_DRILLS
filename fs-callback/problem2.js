/* Problem 2:
    
Using callbacks and the fs module's asynchronous functions, do the following:
    1. Read the given file lipsum.txt
    2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
    3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
    4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
    5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
    
*/

const fs = require("fs");

function createFileLipsum(callback) {
  fs.writeFile(
    "lipsum.txt",
    `Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
Rerum numquam ab aliquid sunt veniam officiis maiores? Voluptatum eum numquam debitis,
 ea impedit unde sit ullam dolores? Facilis pariatur nesciunt minus.
Mollitia, quasi voluptatibus, officia beatae voluptatem ea maxime deserunt 
accusantium hic nobis facere rem consequatur eum asperiores doloribus! 
Error laborum exercitationem dolore ducimus animi, placeat consequuntur reprehenderit esse eveniet commodi.
Doloremque numquam, sapiente quisquam minus ipsa sequi reiciendis tempore,
 repellendus, quas architecto deleniti beatae voluptate iste error illum voluptatum. Vel assumenda quam eligendi reiciendis, accusamus consectetur sint placeat quibusdam? Cupiditate!`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("lipsum.txt Created");

        callback();
      }
    }
  );
}

function readFilesLipsum(callback) {
  fs.readFile("lipsum.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File Content:", data);

      callback();
    }
  });
}

function convertToUpperCase(callback) {
  fs.readFile("lipsum.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let uppercaseData = data.toUpperCase();

    fs.writeFile("upper.txt", uppercaseData, "utf8", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          "File has been converted to uppercase and saved as upper.txt"
        );

        callback();
      }
    });
  });
}

function LowerCaseConversion(callback) {
  fs.readFile("upper.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let newLowercaseData = data.toLocaleLowerCase();
    let newSentence = newLowercaseData.split(".");
    fs.writeFile("lower.txt", newSentence.join(".\n"), "utf8", (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Data converted to lowercase and saved as lower.txt");

      callback();
    });
  });
}

function sortFileContent(callback) {
  fs.readFile("lower.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }

    let newData = data.split("\n").sort();

    fs.writeFile("filenames.txt", newData.join("\n"), "utf8", (err) => {
      if (err) {
        console.log("Error writing file:", err);
        return;
      }
      console.log("Sorted content saved as filenames.txt");
      callback();
    });
  });
}

function deleteFiles(callback) {
  fs.writeFile("filenames.txt", "I am Shradha Suman", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File Created");
    }
  });

  fs.readFile("filenames.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const filesToDelete = [
      "lipsum.txt",
      "upper.txt",
      "lower.txt",
      "filenames.txt",
    ];

    filesToDelete.forEach((file) => {
      fs.unlink(file, (err) => {
        if (err) {
          console.error(`Error deleting ${file}:`, err);
        } else {
          console.log(`${file} deleted successfully!`);
        }
      });
    });
  });
}

module.exports = {
  createFileLipsum,
  readFilesLipsum,
  convertToUpperCase,
  LowerCaseConversion,
  sortFileContent,
  deleteFiles,
};
