const mechanismColorsModel = require('../models/mechanismColors');

/**
 * @exports
 * @method addMechanismColor
 * @param {object} data
 * @summary create a new mechanism color in database
 * @returns {Promise<void>}
 */
function addMechanismColor(data) {
    return mechanismColorsModel.create(data);
}

/**
 * @exports
 * @method getMechanismColors
 * @param {object} data
 * @summary get all mechanism colors from database
 * @returns {Promise<void>}
 */
function getMechanismColors(data) {
    return mechanismColorsModel.find(data);
}

/**
 * @exports
 * @method getMechanismColor
 * @param {object} data
 * @summary get one mechanism color from database
 * @returns {Promise<void>}
 */
function getMechanismColor(data) {
    return mechanismColorsModel.findOne(data);
}

/**
 * @exports
 * @method deleteMechanismColor
 * @param {string} color
 * @summary delete mechanism color by colorName
 * @returns {Promise<void>}
 */
function deleteMechanismColor(color) {
    return mechanismColorsModel.deleteOne({ color });
}

module.exports = {
    addMechanismColor,
    getMechanismColors,
    getMechanismColor,
    deleteMechanismColor,
};
