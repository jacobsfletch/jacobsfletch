const express = require('express'),
	app = express(),
	path = require('path')

require('dotenv').config()

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'))
});

const port = 8081

app.listen(port)

console.log('Listening on port ' + port)
