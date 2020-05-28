var member = ['kang', 'kim', 'seo'];
var roles= {
    'programmer': 'kang',
    'designer': 'kim',
    'musitian': 'seo'
}

for(var i = 0; i < member.length; i++){
    console.log('loop  ' + member[i]);
}

for(var name in roles){
    console.log('role: ', name, ', name:', roles[name]);
}

var temp = function(){
    return 11;
}

var t = temp();

console.log(t);