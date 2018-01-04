var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Resume = new keystone.List('Resume', {
	map: {
		name: 'title'
	},
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true
	}
});

Resume.add({
	title: {
		type: String,
		required: true,
		initial: true,
	},
	intro: {
		a: {
			label: 'Intro A',
			type: String
		},
		b: {
			label: 'Intro B',
			type: String
		},
	},
	specialization: {
		type: String,
		wysiwyg: false,
		height: 150
	},
	quote: {
		type: String,
		wysiwyg: false,
		height: 150
	},
	personals: {
		type: Types.Html,
		wysiwyg: false,
		height: 500
	},
	experience: {
		type: Types.Html,
		wysiwyg: false,
		height: 500
	},
	education: {
		type: Types.Html,
		wysiwyg:  false,
		height: 500
	},
	technicals: {
		type: Types.Html,
		wysiwyg:  false,
		height: 500
	},
});

Resume.defaultColumns = 'name';
Resume.register();
