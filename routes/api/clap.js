var async = require('async'),
	keystone = require('keystone'),
	ObjectId = require('mongoose').Types.ObjectId,
	Projects = keystone.list('Project').model
	Articles = keystone.list('Article').model

exports.project = function(req, res) {
	var data = (req.method == 'POST') ? req.body : req.query
	var id = data.id
	Projects.findById(id)
	.exec(function(err, result) {
		if (err) return res.apiError('database error', err)
		if (!result) { return res.status(406).send('Project Not Found!') }
		if(result) {
			result.claps = result.claps + 1
			result.getUpdateHandler(req).process(result, function(err) {
				if (err) return res.apiError('there was an error:', error)
				res.apiResponse('success: ' + result.claps)
			})
		}
	})
}

exports.article = function(req, res) {
	var data = (req.method == 'POST') ? req.body : req.query
	var id = data.id
	Articles.findById(id)
	.exec(function(err, result) {
		if (err) return res.apiError('database error', err)
		if (!result) { return res.status(406).send('Article Not Found!') }
		if(result) {
			result.claps = result.claps + 1
			result.getUpdateHandler(req).process(result, function(err) {
				if (err) return res.apiError('there was an error:', error)
				res.apiResponse('success: ' + result.claps)
			})
		}
	})
}
