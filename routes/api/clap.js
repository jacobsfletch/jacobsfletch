const async = require('async'),
const keystone = require('keystone'),
const ObjectId = require('mongoose').Types.ObjectId,
const Projects = keystone.list('Project').model

exports.get = function(req, res) {
	var locals = res.locals

	var req = (req.method == 'GET') ? req.body : req.query

	Projects.model.findOne({
		id: req.id
	})
	.exec(function(err, result) {
		if (err) return res.apiError('database error', err)
		if (!result) { return res.status(406).send('Project Not Found!') }
		res.apiResponse(result)
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
