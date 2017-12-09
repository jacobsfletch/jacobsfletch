const keystone = require('keystone')
const Project = keystone.list('Project').model

exports.getAllPublished = function(req, res) {
    Project.find({
        state: 'published',
    })
    .populate('team hashtags categories tags')
    .sort('sortOrder')
    .exec(function(err, items) {
        if (err) return res.apiError('database error', err);
        if (!items) return res.apiError('No project was found.');
        res.apiResponse(items);
    });
};
