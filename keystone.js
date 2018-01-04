require('dotenv').config()

var keystone = require('keystone')

keystone.init({
	'name': 'jacobsfletch.com',
	'brand': 'jacobsfletch',
	'static': 'build',
	'favicon': 'build/favicon.ico',
	'auto update': true,
	'auth': true,
	'user model': 'User',
	'port': process.env.PORT,
	'cookie secret': process.env.COOKIE_SECRET,
	'mongo': 'mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_URL,
	'cloudinary config': process.env.CLOUDINARY,
	'mailgun api key': process.env.MAILGUN_API_KEY,
	'mailgun domain': process.env.MAILGUN_DOMAIN
})

keystone.import('models');

// keystone.set() or add the key-value pair into keystone.init() object above
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
})

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	'people': ['users', 'subscribers'],
	'relationships': ['teams', 'clients', 'categories', 'tags', 'hashtags'],
	'content': ['globals', 'resumes'],
	'posts': ['projects', 'products', 'articles']
})

// Start Keystone to connect to your database and initialise the web server
keystone.start()
