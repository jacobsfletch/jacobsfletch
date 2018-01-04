var async = require('async'),
    keystone = require('keystone'),
    ObjectId = require('mongoose').Types.ObjectId,
    Projects = keystone.list('Project')

exports.send = function(req, res) {
    var locals = res.locals

    var item = new Subscriber.model(),
        userdata = (req.method == 'POST') ? req.body : req.query

    data = {}
    data.email = userdata.emailAddress.toLowerCase()

    Projects.model.findOne({ email: data.email }).exec(function(err, result) {
        if (result) { return res.status(406).send('User already subscribed!') }
        addSubscriber()
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
