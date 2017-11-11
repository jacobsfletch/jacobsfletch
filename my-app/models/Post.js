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
    state: {
        type: Types.Select,
        options: 'draft, published, archived',
        default: 'draft',
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
    author: {
        type: Types.Relationship,
        ref: 'User',
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
        project: {
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
        excerpt: {
            type: Types.Html,
            wysiwyg: false,
            height: 150
        },
        full: {
            type: Types.Html,
            wysiwyg: false,
            height: 400
        }
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

Post.defaultColumns = 'title, state, author, publishedDate';
Post.register();
