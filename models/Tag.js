var keystone = require('keystone');

var Tag = new keystone.List('Tag', {
	autokey: {
        from: 'name',
        path: 'key',
        unique: true
    }
});

Tag.add({
	name: {
        type: String,
        required: true
    }
});

Tag.register();
