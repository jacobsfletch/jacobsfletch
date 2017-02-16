var keystone = require('keystone');

exports = module.exports = function (req, res) {

    // Define the variables
    var data = (req.method == 'POST') ? req.body : req.query;
    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Load the Products
    view.on('init', function (next) {
        var q = keystone.list('Product').model.find({
            state: 'published',
        }).populate('author categories tags hashtags');

        q.exec(function (err, result) {
            if (result) {
                locals.products = result;
            }
            next(err);
        });
    });

    // Render the view
    view.render('shop');

};
