const keystone = require('keystone')
const Article = keystone.list('Article').model

exports.getAllPublished = function(req, res) {
	Article.find({
		state: 'published',
	})
	.populate('author hashtags categories tags')
	.sort('-publishedDate')
	.exec(function(err, items) {
		if (err) return res.apiError('database error', err);
		if (!items) return res.apiError('No article was found.');
		res.apiResponse(items);
	});
};
