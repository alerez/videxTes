const { Schema } = require('mongoose');
const connections = require('../connections/mongooseConnection');

const backgroundSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
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
        collection: 'backgrounds',
        versionKey: false,
    },
);
module.exports = connections.model('backgroundModel', backgroundSchema);
