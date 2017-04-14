var keystone = require('keystone'),
    Project = keystone.list('Project');

exports.previous = function(req, res) {
    var current_slug = req.params.slug;
    Project.model.find({
        state: 'published',
    })
    .exec(function (err, result) {
        var projects = result;
        for (var i=0; i < projects.length; i++) {
            if(current_slug == projects[i].slug) {
                if([i-1] >= 0) {
                    var previous_slug = projects[i-1].slug;
                    success(previous_slug, res);
                } else {
                    i = projects.length - 1;
                    var previous_slug = projects[i].slug;
                    success(previous_slug, res);
                }
            }
        }
    });
};

exports.next = function(req, res) {
    var current_slug = req.params.slug;
    Project.model.find({
        state: 'published',
    })
    .exec(function (err, result) {
        var projects = result;
        for (var i=0; i < projects.length; i++) {
            if(current_slug == projects[i].slug) {
                if([i+1] <= projects.length - 1) {
                    var previous_slug = projects[i+1].slug;
                    success(previous_slug, res);
                } else {
                    var previous_slug = projects[0].slug;
                    success(previous_slug, res);
                }
            }
        }
    });
};

function success(slug, res) {
    Project.model.findOne({
        slug: slug
    }).exec(function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.redirect('/portfolio/' + slug)
        }
    });
}
