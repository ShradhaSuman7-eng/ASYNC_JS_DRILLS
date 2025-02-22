const {
  createFileLipsum,
  readFilesLipsum,
  convertToUpperCase,
  LowerCaseConversion,
  deleteFiles,
  sortFileContent,
  
} = require("../problem2");

createFileLipsum(() => {
  readFilesLipsum(() => {
    convertToUpperCase(() => {
      LowerCaseConversion(() => {
        sortFileContent(() => {
          deleteFiles();
        });
      });
    });
  });
});
