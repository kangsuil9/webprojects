var a = function(x, y) {
    console.log(x+y);
}


function slowfunc(callback){
    console.log('slow function finished');
    callback(10, 111);
}

slowfunc(a);