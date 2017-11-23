var keystone = require('keystone');
var Types = keystone.Field.Types;

var Project = new keystone.List('Project', {
    sortable: true,
    map: {
        name: 'title'
    },
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true
    }
});

Project.add({
    title: {
        type: String,
        required: true,
        initial: true,
    },
    state: {
        type: Types.Select,
        options: 'draft, published, archived',
        default: 'draft',
        index: true
    },
    clientCheck: {
        type: Boolean,
        initial: true,
        label: 'Is this is a client project?'
    },
    client: {
        type: String,
        initial: true,
        required: true,
        dependsOn: {clientCheck: true}
    },
    categories: {
        type: Types.Relationship,
        ref: 'Category',
        many: true,
        initial: true,
    },
    tags: {
        type: Types.Relationship,
        ref: 'Tag',
        many: true,
        initial: true,
    },
    hashtags: {
        type: Types.Relationship,
        ref: 'Hashtag',
        many: true,
        initial: true,
    },
    related: {
        post: {
            type: Types.Relationship,
            ref: 'Post',
            initial: true,
        },
        product: {
            type: Types.Relationship,
            ref: 'Product',
            initial: true,
        }
    },
    deliverables: {
        type: Types.Text
    },
    featuredImage: {
        type: Types.Text
    },
    images: {
        type: Types.TextArray
    },
    content: {
        type: Types.Html,
        wysiwyg: false,
        height: 150
    },
    quote: {
        type: Types.Html,
        wysiwyg: false,
        height: 150
    },
    quoteAuthor: {
        type: Types.Html,
        wysiwyg: false,
        height: 150
    }
});

Project.defaultColumns = 'title, client, state';
Project.register();
