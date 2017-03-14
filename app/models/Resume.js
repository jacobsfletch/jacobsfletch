var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Resume = new keystone.List('Resume', {
    map: {
        name: 'title'
    },
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true
    }
});

Resume.add({
    title: {
        type: String,
        required: true,
        initial: true,
    },
    intro: {
        a: {
            label: 'Intro A',
            type: String
        },
        b: {
            label: 'Intro B',
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
        type: Types.Html,
        wysiwyg:  false,
        height: 500
    },
    personal: {
        type: Types.Html,
        wysiwyg: false,
        height: 500
    }
});

Resume.defaultColumns = 'name';
Resume.register();
