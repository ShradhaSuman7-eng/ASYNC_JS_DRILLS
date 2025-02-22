const {createDirectory,addFiles,deleteFile}=require("../Problem1")

createDirectory()
.then(() => addFiles())
.then(()=>deleteFile())
