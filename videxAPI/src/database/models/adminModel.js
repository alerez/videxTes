const { Schema } = require('mongoose');
const connections = require('../connections/mongooseConnection');

const adminSchema = new Schema(
    {
        login: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        collection: 'admins',
        versionKey: false,
    },
);
module.exports = connections.model('adminModel', adminSchema);
