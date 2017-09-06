/**
 * Created by chenkuan on 2017/9/5.
 */
const fs = require("fs")
const path = require("path")
const config = require('../configs/index')

function getAllDirsByPath(dir) {
    const root = path.resolve(config.workspace, `.${dir}`);
    console.log(config.workspace, dir , root)
    let pa = fs.readdirSync(root);
    const dirs = [];
    const files = [];
    pa.forEach((ele,id) => {
        let info = fs.statSync(root+"/"+ele);
        const item = {
            isDir: info.isDirectory(),
            path: dir + ele,
            name: ele,
        };
        info.isDirectory() ? dirs.push(item) : files.push(item)
    })
    return dirs.concat(files)

}

function getRootDirs() {
    return getAllDirsByPath('/')
}
module.exports = {getAllDirsByPath, getRootDirs}
