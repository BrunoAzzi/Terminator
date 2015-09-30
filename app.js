var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());

app.get('/json', function(req, res) {
    res.header("Content-Type",'application/json');
    fs.readFile('output.json', function (err, data) {
      if (err) {
        throw err;
      }
      res.send(data);
    });
})

app.post('/json', function(req, res) {
    console.log(req.body);
    fs.writeFile('output.json', JSON.stringify(req.body, null, 4), function(err){});
    res.send("ok");
})

app.listen(process.env.PORT || 3000);
