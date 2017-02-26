var keystone = require('keystone');

exports.send = function(req, res) {
	var locals = res.locals,
	data = (req.method == 'POST') ? req.body : req.query;

	locals.first = data.first;
    locals.last = data.last;
	locals.email = data.email;
	locals.message = data.message;

	new keystone.Email('contact').send({
	    subject: locals.name + ' Contact from jacobsfletch.com',
	    to: 'jacobsfletch@gmail.com',
			from: {
	        name: data.name,
	        email: 'jacobsfletch@gmail.com',
	        html: ''
	    },
	    message: locals.message,
	    reply: locals.email
		}, function(err, info){
			if(err) return res.apiError('There was an error sending your message, try again?', err);
			success();
		});

	function success(){
		res.apiResponse({
			success: true
		});
	}
}
