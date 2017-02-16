var keystone = require('keystone');
exports = module.exports = function (req, res) {
    var data = (req.method == 'POST') ? req.body : req.query;
    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Load the current post
    view.on('init', function (next) {
        var q = keystone.list('Post').model.find({
            state: 'published',
        }).populate('author categories tags hashtags');

        q.exec(function (err, results) {
            if (results) {
                locals.posts = results;
            }
            next(err);
        });
    });

    // Render the view
    view.render('blog');

};
