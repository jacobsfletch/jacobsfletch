var keystone = require('keystone');

exports = module.exports = function (req, res) {

    // Define the variables
    var view = new keystone.View(req, res);

    // Render the view
    view.render('index');

};
