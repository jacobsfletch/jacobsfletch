var async = require('async'),
	keystone = require('keystone'),
	ObjectId = require('mongoose').Types.ObjectId,
	Projects = keystone.list('Project')

exports.get = function(req, res) {
	var locals = res.locals

	var req = (req.method == 'GET') ? req.body : req.query

	Projects.model.findOne({ id: req.id }).exec(function(err, result) {
		if (!result) { return res.status(406).send('Project Not Found!') }
		return
	})
}

exports.post = function(req, res) {
	var locals = res.locals

	var data = (req.method == 'POST') ? req.body : req.query

	Projects.model.findOne({ id: data.id }).exec(function(err, result) {
		if (!result) { return res.status(406).send('Project Not Found!') }
		return
	})
}
