var express = require('express')
var app = express()
var path = require('path')
var keystone = require('keystone')
var middleware = require('./middleware')
var importRoutes = keystone.importer(__dirname)

var routes = {
	api: importRoutes('./api')
}
keystone.pre('routes', middleware.api);
keystone.pre('render', middleware.flashMessages);

exports = module.exports = function(app) {

    //app.use(express.static(path.join(__dirname, 'build')))
    app.get('/api/portfolio', routes.api.portfolio.getAllPublished)
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public', '/index.html'))
    })

}
