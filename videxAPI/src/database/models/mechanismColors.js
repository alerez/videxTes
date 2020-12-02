const { Schema } = require('mongoose');
const connections = require('../connections/mongooseConnection');

const mechanismColorsSchema = new Schema(
    {
        color: {
            type: String,
            required: true,
            trim: true,
        },
        description:{
            type: Object,
            required: true
        },
        fileURL: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        collection: 'mechanismColors',
        versionKey: false,
    },
);
module.exports = connections.model('mechanismColorsSchema', mechanismColorsSchema);
