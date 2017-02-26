var keystone = require('keystone');

exports = module.exports = function (req, res) {

    // Define the variables
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var resume = req.params.resume

    // Load the Resume
    view.on('init', function (next) {
        var q = keystone.list('Resume').model.findOne({
            slug: 'main'
        });

        q.exec(function (err, result) {
            if (result) {
                locals.resume = result;
            }
            next(err);
        });

    });

    // Render the view
    view.render('more');

};
