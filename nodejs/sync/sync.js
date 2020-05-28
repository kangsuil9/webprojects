const fs = require('fs');

console.log('A');
var aaa = fs.readFileSync('sample.txt', 'utf-8');
console.log(aaa);
console.log('C');