var async = require('async'),
	keystone = require('keystone'),
	ObjectId = require('mongoose').Types.ObjectId,
	Subscriber = keystone.list('Subscriber')

exports.create = function(req, res) {
	var locals = res.locals

	var item = new Subscriber.model(),
		userdata = (req.method == 'POST') ? req.body : req.query

	data = {}
	data.email = userdata.emailAddress.toLowerCase()

	Subscriber.model.findOne({ email: data.email }).exec(function(err, result) {
		if (result) { return res.status(406).send('User already subscribed!') }
		addSubscriber()
	})

	function addSubscriber() {
		// Create new user
		var newSubscriber = new Subscriber.model(data)

		// Save new user to db
		newSubscriber.save(function(err) {
			if (err) { return res.apiError('Something went wrong!', err) }
			return res.apiResponse(newSubscriber)
		})
	}
}

exports.remove = function(req, res) {
	var data = (req.method == 'POST') ? req.body : req.query
	var id = data.id
	Subscriber.model.findById(id)
	.exec(function(err, item) {
		if(item) {
			if(process.env.ENVIORNMENT != 'development') {
				var canEdit = req.user._id.toString() == item._id.toString() || req.user.canAccessKeystone;
				if (!canEdit) return res.apiError('You don\'t have edit priviliages of this player', 'no permissions')
					}
					Subscriber.model.remove({
						_id: id
					},function(err){
					if (err) return res.apiError('Sorry, there was an issue removing this player.', err)
					res.apiResponse({
						success: true,
						user: item
					})
				})
			} else {
			return res.apiError('This player doesn\'t exists', 'player doesn\'t exist')
		}
	})
}
