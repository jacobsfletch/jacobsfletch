require('dotenv').config();

var Email = require('keystone-email');
var keystone = require('keystone');

exports.send = function(req, res) {
    var locals = res.locals,
    data = (req.method == 'POST') ? req.body : req.query;

    console.log('here');

    keystone.list('User').model.findOne({
        key: 'jacob-fletcher'
    }).exec(function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            contact(result.email);
        }
    });

    function contact(email) {
        new Email('public/emails/contact.html', {
            transport: 'mailgun',
        }).send({
            first: data.first,
            last: data.last,
            email: data.email,
            message: data.message
        }, {
            apiKey: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN,
            to: email,
            from: 'jacobsfletch.com <contact@jacobsfletch.com>',
            subject: 'Contact from jacobsfletch.com',
        }, function (err, result) {
            if (err) {
                console.error('Mailgun test failed with error:\n', err);
            } else {
                console.log('Successfully sent Mailgun test with result:\n', result);
                confirm();
            }
        });
    }

    function confirm() {
        new Email('public/emails/contact-confirmation.html', {
            transport: 'mailgun',
        }).send({
            first: data.first,
            last: data.last,
            email: data.email,
            message: data.message
        }, {
            apiKey: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN,
            to: data.email,
            from: 'jacobsfletch.com <confirmation@jacobsfletch.com>',
            subject: 'Confirmation from jacobsfletch.com',
        }, function (err, result) {
            if (err) {
                console.error('Mailgun test failed with error:\n', err);
            } else {
                console.log('Successfully sent Mailgun test with result:\n', result);
                success();
            }
        });
    }

    function success() {
        res.apiResponse('success')
    }
}
