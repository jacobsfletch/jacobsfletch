const keystone = require('keystone')
const Project = keystone.list('Project')

exports.getAllPublished = function(req, res) {
	Project.model.find({
        state: 'published',
    })
    .sort('sortOrder')
    .exec(function(err, items) {
		if (err) return res.apiError('database error', err);
		if (!items) return res.apiError('No project was found.');
		res.apiResponse(items);
	});
};
