const { Schema } = require('mongoose');
const connections = require('../connections/mongooseConnection');

const mechanismSchema = new Schema(
    {
        color: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true
        },
        material: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: Object,
            required: true,
        },
        productCode: {
            type: Number,
            required: true,
        },
        article: {
            type: String,
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
        collection: 'mechanisms',
        versionKey: false,
    },
);
module.exports = connections.model('mechanismSchema', mechanismSchema);
