require('dotenv').config();

var Email = require('keystone-email');
var keystone = require('keystone');

exports.contact = function(req, res) {
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
        new Email('public/emails/contact.pug', {
            engine: 'pug',
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
            subject: 'Someone sent a letter!',
        }, function (err, result) {
            if (err) { console.error('Mailgun failed with error:\n', err); }
            else { console.log('Mailgun success with result:\n', result); confirm(); }
        });
    }

    function confirm() {
        new Email('public/emails/contacted.pug', {
            engine: 'pug',
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
            subject: 'Your letter is on its way!',
        }, function (err, result) {
            if (err) { console.error('Mailgun failed with error:\n', err); }
            else { console.log('Mailgun success with result:\n', result); success(); }
        });
    }

    function success() {
        res.apiResponse('success')
    }
}

exports.subscribe = function(req, res) {
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
        new Email('public/emails/subscribe.pug', {
            engine: 'pug',
            transport: 'mailgun',
        }).send({
            email: data.emailAddress
        }, {
            apiKey: process.env.MAILGUN_API_KEY,
            domain: domain,
            to: email,
            from: 'jacobsfletch.com <contact@jacobsfletch.com>',
            subject: 'New subscriber!',
        }, function (err, result) {
            if (err) { console.error('Mailgun failed with error:\n', err); }
            else { console.log('Mailgun success with result:\n', result); confirm(); }
        });
    }

    function confirm() {
        new Email('public/emails/subscribed.pug', {
            engine: 'pug',
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
            subject: 'Thank you for subscribing!',
        }, function (err, result) {
            if (err) { console.error('Mailgun failed with error:\n', err); }
            else { console.log('Mailgun success with result:\n', result); success(); }
        });
    }

    function success() {
        res.apiResponse('success')
    }
}

exports.doodle = function(req, res) {
    var locals = res.locals,
        data = (req.method == 'POST') ? req.body : req.query;
        domain = process.env.ENV = 'production' ? 'jacobsfletch.com' : process.env.MAILGUN_DOMAIN;

    keystone.list('User').model.findOne({
        key: 'jacob-fletcher'
    }).exec(function (err, result) {
        if (err) { console.log(err); }
        if (result) { send(result.email); }
    });

    function send(email) {
        new Email('public/emails/doodle.pug', {
            engine: 'pug',
            transport: 'mailgun'
        }).send({
            doodle: data.doodle
        }, {
            apiKey: process.env.MAILGUN_API_KEY,
            domain: domain,
            to: email,
            from: 'jacobsfletch.com <doodle@jacobsfletch.com>',
            subject: 'Someone sent a doodle!',
            attachment: {data: data.doodle, filename: 'doodle.png'}
        }, function (err, result) {
            if (err) { console.error('Mailgun failed with error:\n', err); }
            else {
                console.log('Mailgun success with result:\n', result);
                res.apiResponse('success')
            }
        });
    }
}
