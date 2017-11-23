require('dotenv').config();

var Email = require('keystone-email');
var keystone = require('keystone');

exports.send = function(req, res) {
    console.log('hi');
    var locals = res.locals,
    data = (req.method == 'POST') ? req.body : req.query;
    domain = process.env.ENV = 'production' ? 'jacobsfletch.com' : process.env.MAILGUN_DOMAIN;

    keystone.list('User').model.findOne({
        key: 'jacob-fletcher'
    }).exec(function (err, result) {
        if (err) { console.log(err); }
        if (result) { contact(result.email); }
    });

    function contact(email) {
        new Email('public/emails/contact.html', {
            transport: 'mailgun',
        }).send({
            first: data.firstName,
            last: data.lastName,
            email: data.emailAddress
        }, {
            apiKey: process.env.MAILGUN_API_KEY,
            domain: domain,
            to: email,
            from: 'jacobsfletch.com <contact@jacobsfletch.com>',
            subject: 'Contact from jacobsfletch.com',
        }, function (err, result) {
            if (err) { console.error('Mailgun failed with error:\n', err); }
            else { console.log('Mailgun success with result:\n', result); confirm(); }
        });
    }

    function confirm() {
        new Email('public/emails/contact-confirmation.html', {
            transport: 'mailgun',
        }).send({
            first: data.firstName,
            last: data.lastName,
            email: data.emailAddress
        }, {
            apiKey: process.env.MAILGUN_API_KEY,
            domain: domain,
            to: data.emailAddress,
            from: 'jacobsfletch.com <confirmation@jacobsfletch.com>',
            subject: 'Confirmation from jacobsfletch.com',
        }, function (err, result) {
            if (err) { console.error('Mailgun failed with error:\n', err); }
            else { console.log('Mailgun success with result:\n', result); success(); }
        });
    }

    function success() {
        res.apiResponse('success')
    }
}
