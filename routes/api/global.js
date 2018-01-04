const keystone = require('keystone')
const Global = keystone.list('Global').model;

exports.getGlobals = function(req, res) {
	Global.findOne({
		slug: 'main',
	})
	.exec(function(err, items) {
		if (err) return res.apiError('database error', err);
		if (!items) return res.apiError('No project was found.');
		res.apiResponse(items);
	});
};
