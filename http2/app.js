const express = require('express')
const fs = require('fs')
const http2 = require('spdy') 
const app = express()
const port = 443

let content10k = fs.readFileSync('./public/stam.json');
let content10b = "1234567890";
app.get('/stam.json', (req, res) => res.send(content10k))

const options = {
  key: fs.readFileSync ('./cert/site.key'),
  cert: fs.readFileSync('./cert/site.crt')
}

var http2Server = http2.createServer(options,app);

http2Server.listen(port,function(){
  console.log("Express HTTP/2 server started");
});

