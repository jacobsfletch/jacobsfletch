const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')

const port = 3001

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', '/index.html'))
})

app.all('/api/test', './api/test')

http.listen(port, () => {
    console.log('Server running on port: ' + port)
})
