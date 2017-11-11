var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var Tag = new keystone.List('Tag', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Tag.add({
	name: { type: String, required: true }
});

Tag.relationship({ ref: 'Post', path: 'categories' });

Tag.register();
