const keystone = require('keystone')
const Resume = keystone.list('Resume').model;

exports.getResume = function(req, res) {
    Resume.findOne({
        slug: 'main',
    })
    .exec(function(err, items) {
        if (err) return res.apiError('database error', err);
        if (!items) return res.apiError('No project was found.');
        res.apiResponse(items);
    });
};
