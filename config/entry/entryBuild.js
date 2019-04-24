const fs = require("fs");
const path = require("path");
const entry = require('./entry');
const rimraf = require('rimraf');

//定义entryBuild
const entryBuildPath = path.resolve(__dirname, '../../entryBuild');
//删除entryBuild
rimraf.sync(entryBuildPath + '/content/');
//创建entryBuild
fs.mkdirSync(entryBuildPath + '/content/');

const entryContent = data =>
    `import React from 'react';
import ReactDOM from 'react-dom';
import Index from '../../app/components/${data.path}';
ReactDOM.render(<Index/>,document.getElementById('root'));`;

/*生成webpack entry 入口文件*/
entry.map((data) => {
    fs.writeFile(entryBuildPath + '/content/' + data.name + '.js', entryContent(data), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    });
});