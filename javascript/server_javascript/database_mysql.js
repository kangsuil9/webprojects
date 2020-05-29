var mysql      = require('mysql');

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '7dnfkwlf',
  database : 'test'
});
conn.connect();

var sql = 'select * from topic';
conn.query(sql, function(err, rows, fields){
    if(err){
        console.log(err);
    }
    else{
        console.log('rows : ', rows);
        console.log('fields : ', fields);
    }
    conn.end();
})