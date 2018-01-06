var keystone = require('keystone');
var Types = keystone.Field.Types;

var Article = new keystone.List('Article', {
	map: {
		name: 'title'
	},
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true
	}
});

Article.add({
	state: {
		type: Types.Select,
		options: 'draft, published, archived',
		default: 'draft',
		index: true
	},
	publishedDate: {
		type: Types.Date,
		index: true,
		parseFormat: 'MM-DD-YYYY',
		format: 'MM-DD-YYYY'
	},
	claps: {
		type: Types.Number,
		default: '0'
	},
	title: {
		type: String,
		required: true,
		initial: true
	},
	author: {
		type: Types.Relationship,
		ref: 'User',
		index: true,
		required: true,
		initial: true
	},
	categories: {
		type: Types.Relationship,
		ref: 'Category',
		many: true
	},
	tags: {
		type: Types.Relationship,
		ref: 'Tag',
		many: true
	},
	related: {
		project: {
			type: Types.Relationship,
			ref: 'Project'
		},
		product: {
			type: Types.Relationship,
			ref: 'Product'
		}
	},
	quote: {
		type: String
	},
	quoteAuthor: {
		type: String
	},
	featuredImage: {
		type: Types.Text
	},
	images: {
		type: Types.TextArray
	},
	content: {
		excerpt: {
			type: Types.Html,
			wysiwyg: false,
			height: 75,
			initial: true,
			required: true
		},
		full: {
			type: Types.Html,
			wysiwyg: false,
			height: 400
		}
	},
	hashtags: {
		type: Types.Relationship,
		ref: 'Hashtag',
		many: true
	}
});

Article.defaultColumns = 'title, state, author, publishedDate';
Article.register();
