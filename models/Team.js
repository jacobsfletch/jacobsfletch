var keystone = require('keystone');

var Team = new keystone.List('Team', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

Team.add({
	name: {
		type: String,
		required: true
	},
	website: {
		type: String
	}
});

Team.relationship({
	path: 'projects',
	ref: 'Project',
	refPath: 'team'
});

Team.register();
