const mechanismModel = require('../models/mechanisms');

/**
 * @exports
 * @method addMechanism
 * @param {object} data
 * @summary create a new mechanism in database
 * @returns {Promise<void>}
 */
function addMechanism(data) {
    return mechanismModel.create(data);
}

/**
 * @exports
 * @method getMechanism
 * @param {object} data
 * @summary get all mechanisms from database with related params
 * @returns {Promise<void>}
 */
function getMechanism(data) {
    return mechanismModel.find(data);
}

/**
 * @exports
 * @method getMechanismByProductCode
 * @param {string} productCode
 * @summary get mechanism from database by productCode
 * @returns {Promise<void>}
 */
function getMechanismByProductCode(productCode) {
    return mechanismModel.findOne({ productCode });
}

/**
 * @exports
 * @method updateMechanism
 * @param {number} productCode
 * @param {object} data
 * @summary update mechanism by productCode
 * @returns {Promise<void>}
 */
function updateMechanism(productCode, data) {
    return mechanismModel.updateOne({ productCode }, data);
}

/**
 * @exports
 * @method deleteMechanism
 * @param {number} productCode
 * @summary delete mechanism by productCode
 * @returns {Promise<void>}
 */
function deleteMechanism(productCode) {
    return mechanismModel.deleteOne({ productCode });
}

module.exports = {
    addMechanism,
    getMechanism,
    getMechanismByProductCode,
    updateMechanism,
    deleteMechanism,
};
