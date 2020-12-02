const frameColorsModel = require('../models/frameColors');

/**
 * @exports
 * @method addFrameColor
 * @param {object} data
 * @summary create a new frame color in database
 * @returns {Promise<void>}
 */
function addFrameColor(data) {
    return frameColorsModel.create(data);
}

/**
 * @exports
 * @method getFrameColors
 * @param {object} data
 * @summary get all frame colors from database by related material
 * @returns {Promise<void>}
 */
function getFrameColors(data) {
    return frameColorsModel.find(data);
}

/**
 * @exports
 * @method getFrameColorByName
 * @param {object} data
 * @summary get all frame colors from database by related material
 * @returns {Promise<void>}
 */
function getFrameColorByName(data) {
    return frameColorsModel.findOne(data);
}

/**
 * @exports
 * @method deleteFrameColor
 * @param {object} data
 * @summary delete frame color by colorName
 * @returns {Promise<void>}
 */
function deleteFrameColor(data) {
    return frameColorsModel.deleteOne(data);
}

module.exports = {
    addFrameColor,
    getFrameColors,
    deleteFrameColor,
    getFrameColorByName,
};
