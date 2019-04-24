const entryBuild = require('../entry/entry');
let entry = {
    index: [
        "./entryBuild/index.js",
        "index"
        ]};
entryBuild.map((data) => {
    entry[data.name] = ['./entryBuild/content/' + data.name + '.js', data.title];
});
module.exports = entry;