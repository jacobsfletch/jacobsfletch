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
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    tagline: {
        a: {
            label: 'Tagline A',
            type: String
        },
        b: {
            label: 'Tagline B',
            type: String
        },
    },
    specialization: {
        type: String,
        wysiwyg: false,
        height: 150
    },
    quote: {
        type: String,
        wysiwyg: false,
        height: 150
    },
    philosophy: {
        type: Types.Html,
        wysiwyg: false,
        height: 150
    },
    education: {
        type: Types.Html,
        wysiwyg:  false,
        height: 500
    },
    experience: {
        type: Types.Html,
        wysiwyg: false,
        height: 500
    },
    skills: {
        design: {
            label: 'Design Skills',
            type: Types.Html,
            wysiwyg:  false,
            height: 500
        },
        development: {
            label: 'Development Skills',
            type: Types.Html,
            wysiwyg: false,
            height: 500
        }
    },
    more: {
        type: Types.Html,
        wysiwyg: false,
        height: 500
    },
    canAccessKeystone: {
        type: Boolean,
        initial: true
    }
});

User.defaultColumns = 'name';
User.register();
