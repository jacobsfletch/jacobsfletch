var keystone = require('keystone')
	Projects = keystone.list('Project').model

exports.getAllPublished = function(req, res) {
	Projects.find({
		state: 'published',
	})
	.populate('team clients hashtags categories tags')
	.sort('sortOrder')
	.exec(function(err, result) {
		if (err) return res.apiError('database error', err)
		if (!result) return res.apiError('No project was found.')
		res.apiResponse(result)
	})
}
