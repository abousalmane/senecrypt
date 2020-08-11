// var path = require('path');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var subs = require('./substitution.js');
app.use(express.static(__dirname +'/public'));

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
app.get('/',function(req,res) {
    res.sendFile(__dirname+'/index.html');
  });

app.post('/crypt', function (req, res) {
let algo= req.body['algo'];
let key=req.body['key'];
let text=req.body['text'];
let op = req.body['op'];
  /*   console.log("algo "+ algo);
    console.log("key "+ key);
    console.log("text "+ text);
    console.log("op " + op); */
    var result;
    switch(algo){
      case 'cesar' :
       result = subs.cesar(text,parseInt(key,10),op);
       break;
      case 'affine' :
        result = subs.affine(text,parseInt(key[0],10),parseInt(key[1],10),op);
        break;
      case 'vigenere' :
        key=key.toUpperCase();
        result = subs.vigenere(text,key,op);
        break;
      case 'beaufort' :
        key=key.toUpperCase();
        result = subs.beaufort(text,key,op);
        break;
      case 'allemande' :
        key=key.toUpperCase();
        result = subs.allemande(text,key,op);
        break;
	
    }

    res.setHeader('Content-Type','text/plain');
    res.status(200);
    res.end(result);
});

app.post('/kasiski',function (req, res) {
  let crypto= req.body['crypto'];
  let keyMin=req.body['keyMin'];
  let keyMax=req.body['keyMax'];
  let polygramme = req.body['polygramme'];
  let rslt = "wainting....." + crypto + keyMin+" "+ keyMax+" " + polygramme;
  res.setHeader('Content-Type','text/plain');
  res.status(200);
  res.end(rslt);
  
});


app.listen(process.env.PORT || 8080);
