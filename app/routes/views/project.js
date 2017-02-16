var keystone = require('keystone');

exports = module.exports = function (req, res) {

    // Define the variables
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var project = req.params.project

    // Load the Project
    view.on('init', function (next) {
        var q = keystone.list('Project').model.findOne({
            state: 'published',
            slug: req.params.project
        }).populate('categories tags');

        q.exec(function (err, result) {
            if (result) {
                locals.project = result;
            }
            next(err);
        });

    });

    // Render the view
    view.render('project');

};
