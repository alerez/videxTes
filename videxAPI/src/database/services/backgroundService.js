const backgroundModel = require('../models/backgrounds');

/**
 * @exports
 * @method addNewBackground
 * @param {object} data
 * @summary create a new background in database
 * @returns {Promise<void>}
 */
function addBackground(data) {
    return backgroundModel.create(data);
}

/**
 * @exports
 * @method getBackground
 * @param {object} data
 * @summary get background from database with related params
 * @returns {Promise<void>}
 */
function getBackground(data) {
    return backgroundModel.find(data);
}

/**
 * @exports
 * @method updateBackground
 * @param {number} id
 * @param {object} data
 * @summary update background by id
 * @returns {Promise<void>}
 */
function updateBackground(id, data) {
    return backgroundModel.updateOne({ id }, data);
}

/**
 * @exports
 * @method deleteItem
 * @param {number} id
 * @summary delete background by id
 * @returns {Promise<void>}
 */
function deleteBackground(id) {
    return backgroundModel.deleteMany({ id });
}

module.exports = {
    addBackground,
    getBackground,
    deleteBackground,
};
