const {writeLipsum,readLipsum,processUpperCase,convertToLowerCase,sortContent,deleteProcessedFiles}=require("../problem2")
writeLipsum()
  .then(readLipsum)
.then(processUpperCase)
.then(convertToLowerCase)
.then(sortContent)
.then(deleteProcessedFiles);
