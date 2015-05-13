var http = require('http'),
	express = require('express'),
	app = express(),
	port = process.env.PORT || 3000;

http
	.createServer(app)
	.listen(port);

app.use(express.static(__dirname + '/build'));
