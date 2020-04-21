const express = require('express')
const fs = require('fs')
const https = require('https')
const app = express()
const port = 443

var privateKey = fs.readFileSync('cert/site.key');
var certificate = fs.readFileSync('cert/site.crt');

var credentials = {key: privateKey, cert: certificate};

let content10k = fs.readFileSync('./public/stam.json');
let content10b = "1234567890";
app.get('/stam.json', (req, res) => res.send(content10b));

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port);
