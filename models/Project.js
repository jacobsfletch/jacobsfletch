var keystone = require('keystone')
var Types = keystone.Field.Types

var Project = new keystone.List('Project', {
	sortable: true,
	map: {
		name: 'name'
	},
	autokey: {
		path: 'slug',
		from: 'name',
		unique: true
	},
})

Project.add({
	name: {
		type: String,
		required: true,
		label: 'Project Name (Slug)',
		initial: true,
	},
	title: {
		type: String,
		required: true,
		initial: true,
	},
	state: {
		type: Types.Select,
		options: 'draft, published, archived',
		default: 'draft',
		index: true,
	},
	publishedDate: {
		type: Types.Date,
		format: 'MMM DD YYYY',
	},
	claps: {
		type: Types.Number,
		default: 0
	},
	team: {
		type: Types.Relationship,
		required: true,
		initial: true,
		ref: 'Team',
		many: false,
	},
	deliverables: {
		type: Types.Text
	},
	categories: {
		type: Types.Relationship,
		ref: 'Category',
		many: true,
	},
	clients: {
		type: Types.Relationship,
		label: 'Client',
		ref: 'Client',
		initial: true
	},
	tags: {
		type: Types.Relationship,
		ref: 'Tag',
		many: true,
	},
	caseStudy: {
		type: Types.Relationship,
		ref: 'Article',
	},
	related: {
		article: {
			type: Types.Relationship,
			ref: 'Article',
			many: true,
		},
		product: {
			type: Types.Relationship,
			ref: 'Product',
			many: true,
		}
	},
	brief: {
		type: Types.Html,
		wysiwyg: false,
		height: 150
	},
	content: {
		type: Types.Html,
		wysiwyg: false,
		height: 150
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
	hashtags: {
		type: Types.Relationship,
		ref: 'Hashtag',
		many: true,
	},
})

Project.defaultColumns = 'name, state|25%'
Project.register()
