var keystone = require('keystone');

exports = module.exports = function (req, res) {

    // Define the variables
    var data = (req.method == 'POST') ? req.body : req.query;
    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Render the view
    view.render('index');

};
