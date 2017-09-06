var express = require('express');
var router = express.Router();
const FileService = require('../service/FileService')

/* GET home page. */
router.get('/getFileListByPath', function(req, res, next) {
  let reqBody = {
    path:req.body.path,
  };
  let pathList = null;
  if (reqBody.path) {
      pathList = FileService.getAllDirsByPath(reqBody.path)
  }else{
      pathList = FileService.getRootDirs()
  }
  res.send(pathList);
});

module.exports = router;
