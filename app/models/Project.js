var keystone = require('keystone');
var Types = keystone.Field.Types;

var Project = new keystone.List('Project', {
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
    state: {
        type: Types.Select,
        options: 'draft, published, archived',
        default: 'draft',
        index: true
    },
    title: {
        type: String,
        required: true,
        initial: true,
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
    backlinks: {
        post: {
            type: Types.Relationship,
            ref: 'Project',
            initial: true,
        },
        product: {
            type: Types.Relationship,
            ref: 'Product',
            initial: true,
        }
    },
    featuredImage: {
        type: Types.CloudinaryImage
    },
    images: {
        type: Types.CloudinaryImages
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

Project.defaultColumns = 'title, state';
Project.register();
