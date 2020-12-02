const Validation = require('../../validation/validation');
const ValidationError = require('../../validation/ValidationError');
const frameService = require('../../database/services/frameService');
const frameColorsService = require('../../database/services/frameColorsService');
const mechanismService = require('../../database/services/mechanismService');
const mechanismColorsService = require('../../database/services/mechanismColors');
const backgroundService = require('../../database/services/backgroundService');
const adminMiddleware = require('../admin/middleware');
const pdfMiddleware = require('./middleware');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function getFrames(req, res, next) {
    try {
        const { error } = Validation.getFrame(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const frames = await frameService.getFrame(req.body);

        return res.status(200).send(frames);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 *
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function getFrameColors(req, res, next) {
    try {
        const { error } = Validation.getFrameColor(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const frameColors = await frameColorsService.getFrameColors(req.body);

        return res.status(200).send(frameColors);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function getMechanisms(req, res, next) {
    try {
        const { error } = Validation.getMechanism(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const mechanisms = await mechanismService.getMechanism(req.body);

        return res.status(200).send(mechanisms);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function getMechanismColors(req, res, next) {
    try {
        const { error } = Validation.getMechanismColor(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const mechanismColors = await mechanismColorsService.getMechanismColors(req.body);

        return res.status(200).send(mechanismColors);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}


/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function getBackgrounds(req, res, next) {
    try {
        const { error } = Validation.getBackground(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const backgrounds = await backgroundService.getBackground(req.body);

        return res.status(200).send(backgrounds);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function getPdf(req, res, next) {
    try {
        const { error } = Validation.pdfInput(req.query);

        if (error) {
            throw new ValidationError(error.details);
        }

        const html = await pdfMiddleware.renderHtml(req.query.templateName, req.query.data);
        const pdfPath = await pdfMiddleware.makePdf(html);

        return res.download(pdfPath, 'configuration.pdf', () => {
            adminMiddleware.deleteFile(pdfPath);
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }

}

module.exports = {
    getFrames,
    getFrameColors,
    getMechanisms,
    getMechanismColors,
    getBackgrounds,
    getPdf,
};
