var keystone = require('keystone');
exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

    // Load the User Data
    view.on('init', function (next) {
        var q = keystone.list('User').model.findOne({
            slug: 'jacob-fletcher'
        }).populate('status');
        q.exec(function (err, result) {
            if (result) {
                locals.user = result;
            }
            next(err);
        });

    });

	// Render the view
	view.render('talk');

};
