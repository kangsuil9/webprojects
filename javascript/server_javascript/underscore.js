var _ = require('underscore');
var arr = [3, 6, 9, 1, 12];

function b(v1, v2){
    console.log('c', v1, v2)
    return v2-v1;
}

arr.sort(b);

console.log(arr);