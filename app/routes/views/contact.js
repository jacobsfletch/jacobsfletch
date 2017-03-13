var keystone = require('keystone');
exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

    // Load the User Data
    view.on('init', function (next) {
        var q = keystone.list('User').model.findOne({
            key: 'jacob-fletcher'
        }).select('status').populate('email');
        q.exec(function (err, result) {
            if (result) {
                locals.user = result;
            }
            next(err);
        });

    });

	// Render the view
	view.render('contact');

};
