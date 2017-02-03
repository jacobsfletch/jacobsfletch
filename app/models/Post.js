var keystone = require('keystone');
var Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
    map: {
        name: 'title'
    },
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true
    }
});

Post.add({
    title: {
        type: String,
        required: true
    },
    state: {
        type: Types.Select,
        options: 'draft, published, archived',
        default: 'draft',
        index: true
    },
    author: {
        type: Types.Relationship,
        ref: 'User',
        index: true
    },
    publishedDate: {
        type: Types.Date,
        index: true,
        dependsOn: {
            state: 'published'
        },
        parseFormat: 'MM-DD-YYYY',
        format: 'MM-DD-YYYY'
    },
    featuredImage: {
        type: Types.CloudinaryImage
    },
    images: {
        type: Types.CloudinaryImages
    },
    tags: {
        type: Types.Relationship,
        ref: 'Tags',
        many: true
    },
    categories: {
        type: Types.Relationship,
        ref: 'Category',
        many: true
    },
    content: {
        excerpt: {
            type: Types.Html,
            wysiwyg: true,
            height: 150
        },
        full: {
            type: Types.Html,
            wysiwyg: true,
            height: 400
        }
    },
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
