var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var template = require('./lib/template.js');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var testFolder = 'data/';
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir(testFolder, (err, files)=>{
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = template.list(files);
          var htmlcode = template.html(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`, '');
          response.writeHead(200);
          response.end(htmlcode);
        });
      }
      else {
        fs.readdir(testFolder, (err, files)=>{
          var list = template.list(files);
          var filteredPath = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredPath}`, 'utf-8', function(err, description){
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
              allowedTags:['h1']
            });
            var htmlcode = template.html(title, list,
              `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
              `<a href="/create">create</a> <a href="/update?id=${sanitizedTitle}">update</a>
              <form action="/delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
              </form>`);
            response.writeHead(200);
            response.end(htmlcode);
          });
        });
      }
    }
    else if(pathname === '/create'){
      fs.readdir(testFolder, (err, files)=>{
        var title = 'WEB - create';
        var list = template.list(files);
        var htmlcode = template.html(title, list, `
        <form action="/create_process" method="post"><p><input type="text" name="title" placeholder="title"></p><p><textarea name="description" placeholder="descriptioin"></textarea></p><input type="submit"></form>
        `, '');
        response.writeHead(200);
        response.end(htmlcode);
      });
    }
    else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data) {
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf-8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
      });
    }
    else if(pathname === '/update'){
      fs.readdir(testFolder, (err, files)=>{
        var filteredPath = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredPath}`, 'utf-8', function(err, description){
          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description);
          var list = template.list(files);
          var htmlcode = template.html(title, list,
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <p>
                <input type="text" name="title" placeholder="title" value="${sanitizedTitle}">
              </p>
              <p>
                <textarea name="description" placeholder="descriptioin">${sanitizedDescription}</textarea>
              </p>
              <input type="submit">
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${sanitizedTitle}">update</a>`);
          response.writeHead(200);
          response.end(htmlcode);
        });
      }); 
    }
    else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data) {
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        var id = post.id;
        fs.rename(`data/${id}`, `data/${title}`, function(err){
          fs.writeFile(`data/${title}`, description, 'utf-8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          });
        });
      });
    }
    else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data) {
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var filteredPath = path.parse(id).base;
        fs.unlink(`data/${filteredPath}`, function(err) {
          response.writeHead(302, {Location: `/`});
          response.end();
        });
      });
    }
    else {
      response.writeHead(404);
      response.end('Not Found');
    }
});
app.listen(3000);