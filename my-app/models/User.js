var keystone = require('keystone'),
    Types = keystone.Field.Types;

var User = new keystone.List('User', {
    track: true,
    defaultColumns: 'user_type, canAccessKeystone',
    autokey: {
        path: 'key',
        from: 'name',
        unique: true
    }
});

User.add({
    name: {
        type: Types.Name,
        required: true,
        index: true
    },
    pseudonym: {
        type: String,
        required: true,
        initial: true,
    },
    email: {
        type: Types.Email,
        initial: true,
        required: true,
        index: true
    },
    password: {
        type: Types.Password,
        initial: true,
        required: true
    },
    status: {
        type: Types.Select,
        options: [{
            value: 'unavailable',
            label: 'Unavailable'
        }, {
            value: 'available',
            label: 'Available'
        }]
    },
    canAccessKeystone: {
        type: Boolean,
        initial: true
    }
});

User.defaultColumns = 'name';
User.register();
