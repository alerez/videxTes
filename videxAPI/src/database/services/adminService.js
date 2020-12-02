const adminModel = require('../models/adminModel');

/**
 * @exports
 * @method getByLogin
 * @param {string} login
 * @summary get admin from database by login
 * @returns {Promise<void>}
 */
function getByLogin(login) {
    return adminModel.findOne({ login }).exec();
}

module.exports = {
    getByLogin,
};
