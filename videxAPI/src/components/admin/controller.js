const Validation = require('../../validation/validation');
const ValidationError = require('../../validation/ValidationError');
const frameService = require('../../database/services/frameService');
const frameColorService = require('../../database/services/frameColorsService');
const mechanismService = require('../../database/services/mechanismService');
const mechanismColorService = require('../../database/services/mechanismColors');
const backgroundService = require('../../database/services/backgroundService');
const adminMiddleware = require('./middleware');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function login(req, res, next) {
    try {
        const { error } = Validation.loginInput(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const user = await adminMiddleware.validateAdmin(req.body.login, req.body.password);
        const token = await adminMiddleware.getToken(user);

        return res.status(200).json({
            token,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function logout(req, res, next) {
    try {
        const verified = await jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);

        if(verified) {
            process.env.JWT_SECRET = Math.random().toString(36)
                .substring(2, 15) + Math.random().toString(36)
                .substring(2, 15);

            return res.status(200).json({
                message: 'Log out',
            });
        }

        return res.status(401).json({
            message: 'Please login',
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function newFrame(req, res, next) {
    try {
        const { error } = Validation.newFrameInput(req.body);
        const fileError = Validation.inputFile(req.files.file);

        if (error) {
            throw new ValidationError(error.details);
        }
        if (fileError.error) {
            throw new ValidationError(fileError.error.details);
        }

        req.body.fileURL = `/images/frames/${req.files.file.name}`;

        const frame = await frameService.addFrame(req.body);

        await adminMiddleware.writeFile(`src/files/pics/frames/${req.files.file.name}`, req.files.file.data);

        return res.status(200).json({
            frame,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateFrame(req, res, next) {
    try {
        const { error } = Validation.updateFrame(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const updatedFrame = await frameService.updateFrame(req.body.productCode, req.body.data);

        return res.status(200).json({
            updatedFrame,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteFrame(req, res, next) {
    try {
        const { error } = Validation.deleteItem(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const { fileURL } = await frameService.getFrameByProductCode(req.body.productCode);
        await adminMiddleware.deleteFile(`src/files/pics/frames/${fileURL.split('/')[3]}`)

        const deletedFrame = await frameService.deleteFrame(req.body.productCode);

        return res.status(200).json({
            deletedFrame,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function newFrameColor(req, res, next) {
    try {
        const { error } = Validation.newFrameColorInput(req.body);
        const fileError = Validation.inputFile(req.files.file);

        if (error) {
            throw new ValidationError(error.details);
        }
        if (fileError.error) {
            throw new ValidationError(fileError.error.details);
        }

        req.body.fileURL = `/images/frameColors/${req.files.file.name}`;

        const frameColor = await frameColorService.addFrameColor(req.body);
        const file = await adminMiddleware.writeFile(`src/files/pics/frameColors/${req.files.file.name}`, req.files.file.data);

        if(!file) throw new Error('The file wasn`t written');

        return res.status(200).json({
            frameColor,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteFrameColor(req, res, next) {
    try {
        const { error } = Validation.deleteFrameColor(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const { fileURL } = await frameColorService.getFrameColorByName(req.body);
        await adminMiddleware.deleteFile(`src/files/pics/frameColors/${fileURL.split('/')[3]}`)

        const deletedFrameColor = await frameColorService.deleteFrameColor(req.body);

        return res.status(200).json({
            deletedFrameColor,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function newMechanism(req, res, next) {
    try {
        const { error } = Validation.newMechanismInput(req.body);
        const fileError = Validation.inputFile(req.files.file);

        if (error) {
            throw new ValidationError(error.details);
        }
        if (fileError.error) {
            throw new ValidationError(fileError.error.details);
        }

        req.body.fileURL = `/images/mechanisms/${req.files.file.name}`;

        const mechanism = await mechanismService.addMechanism(req.body);
        const file = await adminMiddleware.writeFile(`src/files/pics/mechanisms/${req.files.file.name}`, req.files.file.data);

        if(!file) throw new Error('The file wasn`t written');

        return res.status(200).json({
            mechanism,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateMechanism(req, res, next) {
    try {
        const { error } = Validation.updateMechanism(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const updatedMechanism = await mechanismService.updateMechanism(req.body.productCode, req.body.data);

        return res.status(200).json({
            updatedMechanism,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteMechanism(req, res, next) {
    try {
        const { error } = Validation.deleteItem(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const { fileURL } = await mechanismService.getMechanismByProductCode(req.body.productCode);
        await adminMiddleware.deleteFile(`src/files/pics/mechanisms/${fileURL.split('/')[3]}`);

        const deletedMechanism = await mechanismService.deleteMechanism(req.body.productCode);

        return res.status(200).json({
            deletedMechanism,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function newMechanismColor(req, res, next) {
    try {
        const { error } = Validation.newMechanismColorInput(req.body);
        const fileError = Validation.inputFile(req.files.file);

        if (error) {
            throw new ValidationError(error.details);
        }
        if (fileError.error) {
            throw new ValidationError(fileError.error.details);
        }

        req.body.fileURL = `/images/mechanismsColors/${req.files.file.name}`;

        const mechanismColor = await mechanismColorService.addMechanismColor(req.body);
        const file = await adminMiddleware.writeFile(`src/files/pics/mechanismsColors/${req.files.file.name}`, req.files.file.data);

        if(!file) throw new Error('The file wasn`t written');

        return res.status(200).json({
            mechanismColor,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteMechanismColor(req, res, next) {
    try {
        const { error } = Validation.deleteMechanismColor(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const { fileURL } = await mechanismColorService.getMechanismColor(req.body);

        await adminMiddleware.deleteFile(`src/files/pics/mechanismsColors/${fileURL.split('/')[3]}`);

        const deletedMechanismColor = await mechanismColorService.deleteMechanismColor(req.body.color);

        return res.status(200).json({
            deletedMechanismColor,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function newBackground(req, res, next) {
    try {
        const { error } = Validation.inputFile(req.files.badFile);
        const fileError = Validation.inputFile(req.files.goodFile);

        if (error) {
            throw new ValidationError(error.details);
        }
        if (fileError.error) {
            throw new ValidationError(fileError.error.details);
        }

        const token = shortid.generate();

        const bad = await backgroundService.addBackground({
            id: token,
            type: 'bad',
            fileURL: `/images/backgrounds/${req.files.badFile.name}`,
        });
        const good = await backgroundService.addBackground({
            id: token,
            type: 'good',
            fileURL: `/images/backgrounds/${req.files.goodFile.name}`,
        });

        const badFile = await adminMiddleware.writeFile(`src/files/pics/backgrounds/${req.files.badFile.name}`, req.files.badFile.data);
        const goodFile = await adminMiddleware.writeFile(`src/files/pics/backgrounds/${req.files.goodFile.name}`, req.files.goodFile.data);

        if(!badFile || !goodFile) throw new Error('The file wasn`t written');

        return res.status(200).json({
            bad,
            good,
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteBackground(req, res, next) {
    try {
        const { error } = Validation.deleteBackground(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const backgrounds = await backgroundService.getBackground(req.body);
        await adminMiddleware.deleteFile(`src/files/pics/backgrounds/${backgrounds[0].fileURL.split('/')[3]}`);
        await adminMiddleware.deleteFile(`src/files/pics/backgrounds/${backgrounds[1].fileURL.split('/')[3]}`);

        const deletedBackground = await backgroundService.deleteBackground(req.body.id);

        return res.status(200).json({
            deletedBackground,
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
    login,
    logout,
    newFrame,
    updateFrame,
    deleteFrame,
    newFrameColor,
    deleteFrameColor,
    newMechanism,
    updateMechanism,
    deleteMechanism,
    newMechanismColor,
    deleteMechanismColor,
    newBackground,
    deleteBackground,
};
