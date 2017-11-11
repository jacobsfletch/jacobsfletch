var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Global = new keystone.List('Global', {
    map: {
        name: 'title'
    },
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true
    }
});

Global.add({
    title: {
        type: String,
        required: true,
        initial: true,
    },
    meta: {
        title: {
            type: String,
            label: 'Website Title'
        },
        description: {
            type: String,
            label: 'Website Description'
        }
    },
    tagline: {
        a: {
            type: String
        },
        b: {
            type: String
        }
    },
    favicon: {
        type: Types.CloudinaryImage
    },
    icon: {
        type: Types.CloudinaryImage
    },
    startupImg: {
        type: Types.CloudinaryImage
    }
});

Global.defaultColumns = 'name';
Global.register();
