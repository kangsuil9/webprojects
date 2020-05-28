const testFolder = '../data/';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
    for(var i = 0; i < files.length; i++) {
        console.log(files[i]);
    }
});