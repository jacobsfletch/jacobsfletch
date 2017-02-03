var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

    view.on('init', function (next) {
        var q = keystone.list('Project').model.find({
            state: 'published',
        }).populate('author categories tags');

        q.exec(function (err, results) {
            if (results) {
                locals.projects = results;
            }
            next(err);
        });
    });

	// Render the view
	view.render('index');

};
