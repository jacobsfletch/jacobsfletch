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
    canAccessKeystone: {
        type: Boolean,
        initial: true
    },
    user_type: {
        label: 'User Type',
        type: Types.Select,
        options: [{
            value: 'editor',
            label: 'Editor'
        }, {
            value: 'staff',
            label: 'Staff'
        }, {
            value: 'superadmin',
            label: 'Super Admin'
        }],
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
        initial: true
    },
    address: {
        label: 'Location',
        type: Types.Location,
        enableMapsAPI: true,
        defaults: {
            country: 'United States'
        }
    },
    phone: {
        label: 'Phone',
        type: Types.Text
    },
    dob: {
        label: 'Date of Birth',
        type: Types.Date,
        parseFormat: 'MM-DD-YYYY',
        format: 'MM-DD-YYYY',
        dependsOn: {
            user_type: 'player'
        },
    },
    age: {
        type: Types.Number,
        dependsOn: {
            user_type: 'player'
        },
    },
    bio: {
        label: 'Bio',
        type: Types.Html,
        wysiwyg: true,
        height: 400
    },
    customer: {
        type: Types.Text,
        dependsOn: {
            user_type: 'player'
        },
    },
    inactive: {
        type: Boolean
    },
    reset_password: {
        type: Types.Text,
    }
});

User.register();
