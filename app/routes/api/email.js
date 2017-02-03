var keystone = require('keystone');
	
exports.send = function(req, res) {
		var locals = res.locals,
		data = (req.method == 'POST') ? req.body : req.query;		
		
		locals.name = data.name;
		locals.email = data.email;
		locals.message = data.message;

		new keystone.Email('contact-us').send({
		    subject: locals.name +' Contact from Macker.com',
		    to: 'info@macker.com',
				from: {
		        name:data.name,
		        email:'info@macker.com',
		        html:''
		    },
		    message : locals.message,
		    reply : locals.email
			}, function(err, info){
					if(err) return res.apiError('There was an error sending your message. Please try again.', err);
					success();
			});	
		
		function success(){	
			res.apiResponse({
				success: true
			});
		}
}