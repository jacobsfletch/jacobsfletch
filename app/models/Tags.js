var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var Tags = new keystone.List('Tags', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Tags.add({
	name: { type: String, required: true }
});

Tags.relationship({ ref: 'Post', path: 'categories' });

Tags.register();
