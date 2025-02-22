
const { createFolder, addFiles} = require("../problem1");

createFolder()
  .then(() => addFiles())
  .catch((error) => console.error("Error:", error));
