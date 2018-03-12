const express = require('express');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 8080;

app.use(compression());
app.use(express.static(__dirname + '/dist'));

var options = {
	root: __dirname + '/dist/'
};

app.get('/*', (req, res) => {
	res.sendFile('/index.html', options);
});

app.listen(port, () => {
	console.log("This app is up and running!");
});