/**
 * Created by chenkuan on 2017/9/5.
 */
const fs = require("fs");
const path = require("path");
const config = require('../configs/index');

function getAllDirsByPath(dir) {
    const root = path.resolve(config.workspace, `.${dir}`);
    let pa = fs.readdirSync(root);
    const dirs = [];
    const files = [];
    pa.forEach((ele,id) => {
        let info = fs.statSync(root+"/"+ele);
        const item = {
            isDir: info.isDirectory(),
            path: dir === '/' ? (dir + ele) : (dir + '/'+ ele),
            name: ele,
        };
        info.isDirectory() ? dirs.push(item) : files.push(item)
    });
    return dirs.concat(files)

}

function getRootDirs() {
    return getAllDirsByPath('/')
}

function getFileContentByPath(_dir) {
    let dir = path.resolve(config.workspace, `.${_dir}`);
    let info = fs.statSync(dir);
    if(info.blksize > config.fileOpenLimit){
        return {
            content:'无法打开 500k 以上的文件',
            info,
        }
    }
    return {
        content:fs.readFileSync(dir, 'utf-8'),
        info,
    }
}

function saveFileToRemote(_dir, content) {
    let dir = path.resolve(config.workspace, `.${_dir}`);
    const flag = fs.writeFileSync(dir,content);
    let info={};
    if(flag){
        info = getFileContentByPath(_dir)
    }
    if(info.blksize > config.fileOpenLimit){
        return {
            content:'无法编辑 500k 以上的文件',
            info,
        }
    }
    return {
        content:fs.readFileSync(dir, 'utf-8'),
        info,
    }
}
module.exports = {
    getAllDirsByPath,
    getRootDirs,
    getFileContentByPath,
    saveFileToRemote
}
