const { Schema } = require('mongoose');
const connections = require('../connections/mongooseConnection');

const frameColorsSchema = new Schema(
    {
        material: {
            type: String,
            required: true,
            trim: true,
        },
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
        collection: 'frameColors',
        versionKey: false,
    },
);
module.exports = connections.model('frameColorsSchema', frameColorsSchema);
