var Email = require('keystone-email');
var keystone = require('keystone');

exports.send = function(req, res) {
    var locals = res.locals,
    data = (req.method == 'POST') ? req.body : req.query;

    new Email('templates/emails/contact.pug', {
        transport: 'mailgun',
    }).send({
        first: data.first,
        last: data.last,
        email: data.email,
        message: data.message
    }, {
        apiKey: 'key-e35636e96ae137f973dabfb54cd00f75',
        domain: 'sandboxc416772e6d3245a58f11a7661725766e.mailgun.org',
        to: 'Jake <jacobsfletch@gmail.com>',
        from: 'contact@jacobsfletch.com',
        subject: 'Contact from jacobsfletch.com',
    }, function (err, result) {
        if (err) {
            console.error('Mailgun test failed with error:\n', err);
        } else {
            console.log('Successfully sent Mailgun test with result:\n', result);
            success();
        }
    });

    function success() {
        res.redirect('/contact/confirmation')
    }
}
