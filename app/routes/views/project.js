var keystone = require('keystone');
exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Grab data
    var project = req.params.project

    // Load the current post
    view.on('init', function (next) {
        var q = keystone.list('Project').model.findOne({
            state: 'published',
            slug: req.params.project
        }).populate('author categories tags');

        q.exec(function (err, result) {
            if (results) {
                locals.data.project = result;
            }
            next(err);
        });

    });

    // Render the view
    view.render('project');

};
