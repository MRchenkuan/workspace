var express = require('express');
var router = express.Router();
const FileService = require('../service/FileService')

/* GET home page. */
router.post('/getFileListByPath.json', function(req, res, next) {
  let reqBody = {
    path:req.body.dir,
  };
  let pathList = null;
  if (reqBody.path) {
      pathList = FileService.getAllDirsByPath(reqBody.path)
  }else{
      pathList = FileService.getRootDirs()
  }
  res.send(pathList);
});

router.post('/getFileContentByPath.json', function(req, res, next) {
  let reqBody = {
    path:req.body.dir,
  };
  let file = {};
  if (reqBody.path) {
      file = FileService.getFileContentByPath(reqBody.path)
  }else{
      file.content = '找不到文件'
  }
  res.send({
      type:'smt',
      content: file.content,
      size: file.blksize,
  });
});

router.post('/saveFileToRemote.json', function(req, res, next) {
  let reqBody = {
    path:req.body.dir,
    content:req.body.content,
  };
  let file = {};
  if (reqBody.path) {
      file = FileService.saveFileToRemote(reqBody.path, reqBody.content)
  }else{
      file.content = '找不到文件'
  }
  res.send({
      type:'smt',
      content: file.content,
      size: file.blksize,
  });
});

module.exports = router;
