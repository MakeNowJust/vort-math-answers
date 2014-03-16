var
static = require('node-static');

var
file = new static.Server('./public');

require('http').createServer(function (req, res) {
  req.on('end', function () {
    file.serve(req, res);
  }).resume();
}).listen(process.env.PORT || 8080);
