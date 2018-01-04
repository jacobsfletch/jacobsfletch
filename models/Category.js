var keystone = require('keystone');

var Category = new keystone.List('Category', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

Category.add({
	name: {
		type: String,
		required: true
	}
});

Category.relationship({
	path: 'projects',
	ref: 'Project',
	refPath: 'categories'
});

Category.register();
