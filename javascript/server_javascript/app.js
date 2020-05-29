var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req,res){
    res.send('It is home.');
})

app.get('/form', function(req,res){
    res.render('form');
})

app.get('/form_receiver', function(req,res){
    var title = req.params.title;
    var description = req.query.description;

    res.send(title+','+description);
})

app.post('/form_receiver', function(req,res){
    var title = req.body.title;
    var description = req.body.description;

    res.send(title+','+description);
})

app.get('/topic/:id/:mode', function(req,res){
    res.send(req.params.id+','+req.params.mode);
})

app.get('/topic/:id', function(req,res){
    var topics = [
        'JavaScript is ...',
        'Node JS is ...',
        'Express is ...'
    ];
    var str = `
        <a href="/topic?id=0">JavaScript</a><br>
        <a href="/topic?id=1">Node JS</a><br>
        <a href="/topic?id=2">Express</a><br>
    `;
    var output = str + topics[req.params.id];
    res.send(output);
})

app.get('/template', function(req,res){
    res.render('temp');
})

app.get('/dynamic', function(req, res){
    var lis = '';
    for(var i = 0; i < 5; i++){
        lis += '<li>coding</li>';
    }
    var output = `
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Hello</title>
        </head>
        <body>
            <ul>
                ${lis}
            </ul>
        </body>
        </html>
    `;
    res.send(
        output
    );
})

app.get('/login', function(req,res){
    res.send('login please');
});

app.listen(3000, function(){
    console.log('Connected 3000 port!');
});