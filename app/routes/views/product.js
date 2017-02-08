var keystone = require('keystone');

exports = module.exports = function (req, res) {

    // Define the variables
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var product = req.params.product

    // Load the Product
    view.on('init', function (next) {
        var q = keystone.list('Product').model.findOne({
            state: 'published',
            slug: req.params.product
        }).populate('author categories tags hashtags');

        q.exec(function (err, result) {
            if (result) {
                locals.product = result;
            }
            next(err);
        });

    });

    // Render the view
    view.render('product');

};
