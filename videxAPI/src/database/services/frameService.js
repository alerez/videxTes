const frameModel = require('../models/frames');

/**
 * @exports
 * @method addFrame
 * @param {object} data
 * @summary create a new frame in database
 * @returns {Promise<void>}
 */
function addFrame(data) {
    return frameModel.create(data);
}

/**
 * @exports
 * @method getFrame
 * @param {object} data
 * @summary get all frames from database with related params
 * @returns {Promise<void>}
 */
function getFrame(data) {
    return frameModel.find(data);
}

/**
 * @exports
 * @method getOneFrame
 * @param {object} productCode
 * @summary get frame from database by productCode
 * @returns {Promise<void>}
 */
function getFrameByProductCode(productCode) {
    return frameModel.findOne({ productCode });
}

/**
 * @exports
 * @method updateFrame
 * @param {number} productCode
 * @param {object} data
 * @summary update frame by productCode
 * @returns {Promise<void>}
 */
function updateFrame(productCode, data) {
    return frameModel.updateOne({ productCode }, data);
}

/**
 * @exports
 * @method deleteFrame
 * @param {number} productCode
 * @summary delete frame by productCode
 * @returns {Promise<void>}
 */
function deleteFrame(productCode) {
    return frameModel.deleteOne({ productCode });
}

module.exports = {
    addFrame,
    getFrame,
    updateFrame,
    deleteFrame,
    getFrameByProductCode,
};
