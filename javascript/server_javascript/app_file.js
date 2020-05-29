var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express(); 

app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false}));

app.listen(3000, function(req,res){
    
})

app.post('/topic', function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('./data/'+title, description, function(err){
        if(err) {
            res.status(500).send('Internal Server Error');
        }
        else{
            res.redirect('/topic/'+title);
        }
    });
})

app.get('/topic/new', function(req,res){
    fs.readdir('data', function(err, files){
        if(err){
            res.status(500).send('Internal Server Error while reading Directory');
        }
        res.render('new', {topics:files});
    })
})

app.get(['/topic', '/topic/:id'], function(req,res){
    fs.readdir('data', function(err, files){
        if(err){
            res.status(500).send('Internal Server Error while reading Directory');
        }
        var id = req.params.id;
        if(id){
            fs.readFile('data/'+id, 'utf-8', function(err, data){
                if(err){
                    res.status(500).send('Internal Server Error while reading File');
                }
                res.render('view', {"topics":files, "title":id, "description":data});
            })
        }
        else{
            res.render('view', {"topics":files, "title":"Welcome", "description":"Hello~~~"});
        }
    })
})

/*
app.get('/topic/:id', function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            res.status(500).send('Internal Server Error while reading Directory');
        }
        var id = req.params.id;
        fs.readFile('data/'+id, 'utf-8', function(err, data){
            if(err){
                res.status(500).send('Internal Server Error while reading File');
            }
            res.render('view', {"topics":files, "title":id, "description":data});
        })
    })
})
*/
