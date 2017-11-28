var keystone = require('keystone');

var Client = new keystone.List('Client', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Client.add({
	name: { type: String, required: true }
});

Client.relationship({ ref: 'Project', path: 'client' });

Client.register();
