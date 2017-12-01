var keystone = require('keystone');
var Types = keystone.Field.Types;

var Product = new keystone.List('Product', {
    map: {
        name: 'title'
    },
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true
    }
});

Product.add({
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
    productName: {
        type: String,
        label: 'Product Name',
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
    related: {
        projects: {
            type: Types.Relationship,
            ref: 'Project',
            many: true,
            initial: true,
        },
        posts: {
            type: Types.Relationship,
            ref: 'Product',
            many: true,
            initial: true,
        }
    },
    sku: {
        type: Types.Text
    },
    stock: {
        type: Types.Number,
        ref: 'Stock',
    },
    price: {
        type: Types.Money,
        format: '$0,0.00',
        ref: 'Price',
        initial: true,
    },
    specs: {
        weight: {
            Type: String
        },
        dimensions: {
            Type: String
        }
    },
    featuredImage: {
        type: Types.Text
    },
    images: {
        type: Types.TextArray
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
    }
});

Product.defaultColumns = 'title, state, price, sku, sku';
Product.register();
