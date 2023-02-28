var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/post-sample", function (req, res) {
  console.log("/post-sample");

  var updateFile = function (response, body) {
    console.log(body);

    response.write('{"error":0}');
    response.end();
  };

  var readbody = function (request, response) {
    var content = "";
    request.on("data", function (data) {
      content += data;
    });
    request.on("end", function () {
      var body = JSON.parse(content);
      updateFile(response, body);
    });
  };

  readbody(req, res);
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
