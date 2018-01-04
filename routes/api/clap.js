var async = require('async'),
	keystone = require('keystone'),
	ObjectId = require('mongoose').Types.ObjectId,
	Projects = keystone.list('Project')

exports.send = function(req, res) {
	var locals = res.locals

	var data = (req.method == 'POST') ? req.body : req.query

	Projects.model.findOne({ id: data.id }).exec(function(err, result) {
		if (!result) { return res.status(406).send('Project Not Found!') }
		addClap()
	})

	function addClap() {
		// Create new user
		var newSubscriber = new Subscriber.model(data)

		// Save new user to db
		newSubscriber.save(function(err) {
			if (err) { return res.apiError('Something went wrong!', err) }
			return res.apiResponse(newSubscriber)
		})
	}
}
