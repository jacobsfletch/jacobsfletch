var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Subscriber = new keystone.List('Subscriber', {
    track: true,
    defaultColumns: 'email',
    autokey: {
        path: 'key',
        from: 'email',
        unique: true
    }
})

Subscriber.add({
    email: {
        type: Types.Email,
        initial: true,
        required: true,
        index: true
    }
})

Subscriber.defaultColumns = 'email';
Subscriber.register();
