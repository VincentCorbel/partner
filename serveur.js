var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var app = express()

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
 
app.get('/', function (req, res) {
  res.send('Hello World')
  
})

app.get('/lastRequestSend', function (req, res) {
   
   console.log('Read!');
   fs.readFile('lastRequest.json', function(err, data) {
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
   });
  
})

app.post('/partner', function (req, res) {
  console.log(req.body)
  var objJson =  JSON.parse(req.body.jsonStream);
  console.log(objJson.request)
  
  fs.writeFile('lastRequest.json', JSON.stringify(req.body), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  
  
  if (objJson.request === "addAnomalie" ) {
	  console.log(objJson.anomalie.id)
     res.send('[{"request":"createAnomaly","answer":{"id":'+objJson.anomalie.id+'}}]')
  } else {
	 res.send('[{"request":"doneAnomaly","answer":{"id":'+objJson.id+'}}]') 
  }
  
})
 
app.listen(process.env.PORT || 3000)

