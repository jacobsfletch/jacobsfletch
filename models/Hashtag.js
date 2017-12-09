var keystone = require('keystone');

var Hashtag = new keystone.List('Hashtag', {
	autokey: {
        from: 'name',
        path: 'key',
        unique: true
    }
});

Hashtag.add({
	name: {
        type: String,
        required: true
    }
});

Hashtag.relationship({
    path: 'projects',
    ref: 'Project',
    refPath: 'hashtags'
});

Hashtag.register();
