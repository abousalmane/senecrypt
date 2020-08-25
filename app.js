// var path = require('path');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var subs = require('./substitution.js');
var poly = require('./polygrammatiques.js');
app.use(express.static(__dirname +'/public',{maxAge: '86400000'}));//save cache 1h in client side eq=86400000miliseconds.

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
app.get('/',function(req,res) {
  res.setHeader('Cache-Control','public, max-age=3600')
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
      case 'playfair' :
        key=key.toUpperCase();
        result = poly.playfair(text,key,op);
        break;
      case 'polybe':
        key=key.toUpperCase();
        result = poly.polybe(text,key,op);
       break;
      case 'transpoSimple':
        let tr = require('./transpo.js');
        key=key.toUpperCase();
        result = tr.transpoTab(text,key,op);
        break;
    }

    res.setHeader('Content-Type','text/plain');
    res.status(200);
    res.end(result);
});
var analyser = require('./cryptanalyse.js');
app.post('/kasiski',function (req, res) {
  let crypto= req.body['crypto'];
  let keyMin=parseInt(req.body['keyMin'],10);
  let keyMax=parseInt(req.body['keyMax'],10);
  let polygramme = req.body['polygramme'];
  let rslt;
  switch(polygramme){
  case 'trigramme':
      rslt = analyser.trigramme(crypto,keyMin,keyMax);  break;
  case 'bigramme' :{
    rslt = analyser.bigramme(crypto,keyMin,keyMax); break;
  }
  case 'quadrigramme' :{
    rslt = analyser.quadrigramme(crypto,keyMin,keyMax); break;
  }
      
  }
  res.setHeader('Content-Type','application/json');
  res.status(200);
  res.send(JSON.stringify(rslt));
});
app.post('/ic',function (req, res) {
  let crypto= req.body['crypto'];
  let algo = req.body['algo'];
  let rslt = analyser.analyseGenreVigenere(crypto,algo); 
  res.setHeader('Content-Type','application/json');
  res.status(200);
  res.send(JSON.stringify(rslt));
});

app.listen(process.env.PORT || 8080);
