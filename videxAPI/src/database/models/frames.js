const { Schema } = require('mongoose');
const connections = require('../connections/mongooseConnection');

const frameSchema = new Schema(
    {
        position: {
            type: String,
            required: true,
            trim: true,
        },
        color: {
            type: String,
            required: true,
            trim: true,
        },
        material:{
            type: Object,
            required: true
        },
        posts: {
            type: Number,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        article: {
            type: String,
            required: true,
            trim: true,
        },
        productCode: {
            type: Number,
            required: true,
            trim: true,
        },
        fileURL: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        collection: 'frames',
        versionKey: false,
    },
);
module.exports = connections.model('frameSchema', frameSchema);
