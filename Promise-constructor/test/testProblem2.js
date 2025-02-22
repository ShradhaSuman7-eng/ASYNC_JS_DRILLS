const { writeLipsum, readLipsum, processUpperCase, convertToLowerCase, sortContent, deleteProcessedFiles }=require("../Problem2")

writeLipsum()
.then(processUpperCase)
.then(convertToLowerCase)
.then(sortContent)
.then(deleteProcessedFiles)

