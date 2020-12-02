const Joi = require('joi');

function getFrame(data) {
    return Joi
        .object({
            position: Joi
                .string()
                .optional(),
            color: Joi
                .string()
                .optional(),
            material: Joi
                .string()
                .optional(),
            posts: Joi
                .number()
                .optional(),
            article: Joi
                .string()
                .optional(),
            productCode: Joi
                .number()
                .optional(),
        })
        .validate(data);
}

function getFrameColor(data) {
    return Joi
        .object({
            color: Joi
                .string()
                .optional(),
            material: Joi
                .string()
                .optional(),
        })
        .validate(data);
}

function getMechanism(data) {
    return Joi
        .object({
            color: Joi
                .string()
                .optional(),
            type: Joi
                .string()
                .optional(),
            material: Joi
                .string()
                .optional(),
            article: Joi
                .string()
                .optional(),
            productCode: Joi
                .number()
                .optional(),
        })
        .validate(data);
}

function getMechanismColor(data) {
    return Joi
        .object({
            color: Joi
                .string()
                .optional(),
        })
        .validate(data);
}

function getBackground(data) {
    return Joi
        .object({
            id: Joi
                .string()
                .optional(),
            type: Joi
                .string()
                .optional(),
        })
        .validate(data);
}

function newFrameInput(data) {
    return Joi
        .object({
            position: Joi
                .string()
                .required(),
            color: Joi
                .string()
                .required(),
            material: Joi
                .string()
                .required(),
            posts: Joi
                .number()
                .required(),
            price: Joi
                .number()
                .required(),
            article: Joi
                .string()
                .required(),
            productCode: Joi
                .number()
                .required(),
        })
        .validate(data);
}

function updateFrame(data) {
    return Joi
        .object({
            productCode: Joi
                .number()
                .required(),
            data: Joi
                .object({
                    color: Joi
                        .string()
                        .optional(),
                    material: Joi
                        .string()
                        .optional(),
                    position: Joi
                        .string()
                        .optional(),
                    posts: Joi
                        .number()
                        .optional(),
                    article: Joi
                        .string()
                        .optional(),
                    price: Joi
                        .number()
                        .optional(),
                })
                .required(),
        })
        .validate(data);
}

function newFrameColorInput(data) {
    return Joi
        .object({
            material: Joi
                .string()
                .required(),
            color: Joi
                .string()
                .required(),
            description: Joi
                .object({
                    en: Joi
                        .string()
                        .required(),
                    ru: Joi
                        .string()
                        .required(),
                    ua: Joi
                        .string()
                        .required(),
                })
                .required(),
        })
        .validate(data);
}

function deleteFrameColor(data) {
    return Joi
        .object({
            color: Joi
                .string()
                .required(),
            material: Joi
                .string()
                .required(),
        })
        .validate(data);
}

function newMechanismInput(data) {
    return Joi
        .object({
            color: Joi
                .string()
                .required(),
            type: Joi
                .string()
                .required(),
            material: Joi
                .string()
                .required(),
            price: Joi
                .number()
                .required(),
            description: Joi
                .object({
                    en: Joi
                        .string()
                        .required(),
                    ru: Joi
                        .string()
                        .required(),
                    ua: Joi
                        .string()
                        .required(),
                }),
            article: Joi
                .string()
                .required(),
            productCode: Joi
                .number()
                .required(),
        })
        .validate(data);
}

function updateMechanism(data) {
    return Joi
        .object({
            productCode: Joi
                .number()
                .required(),
            data: Joi
                .object({
                    color: Joi
                        .string()
                        .optional(),
                    type: Joi
                        .string()
                        .optional(),
                    material: Joi
                        .string()
                        .optional(),
                    price: Joi
                        .number()
                        .optional(),
                    article: Joi
                        .string()
                        .optional(),
                    description: Joi
                        .object({
                            en: Joi
                                .string()
                                .optional(),
                            ru: Joi
                                .string()
                                .optional(),
                            ua: Joi
                                .string()
                                .optional(),
                        })
                        .optional(),
                })
                .required(),
        })
        .validate(data);
}

function newMechanismColorInput(data) {
    return Joi
        .object({
            color: Joi
                .string()
                .required(),
            description: Joi
                .object({
                    en: Joi
                        .string()
                        .required(),
                    ru: Joi
                        .string()
                        .required(),
                    ua: Joi
                        .string()
                        .required(),
                })
                .required(),
        })
        .validate(data);
}

function deleteMechanismColor(data) {
    return Joi
        .object({
            color: Joi
                .string()
                .required(),
        })
        .validate(data);
}

function inputFile(data) {
    return Joi
        .object({
            name: Joi
                .string(),
            data: Joi
                .binary(),
            mimetype: Joi
                .string()
                .regex(/image\/(jpg|jpeg|png)/),
            size: Joi
                .number(),
            encoding: Joi
                .string(),
            tempFilePath: Joi
                .string()
                .allow('')
                .optional(),
            truncated: Joi
                .boolean(),
            md5: Joi
                .string(),
            mv: Joi
                .optional(),
        })
        .validate(data);
}


function loginInput(data) {
    return Joi
        .object({
            login: Joi
                .string()
                .required(),
            password: Joi
                .string()
                .required(),
        })
        .validate(data);
}

function pdfInput(data) {
    return Joi
        .object({
            templateName: Joi
                .string()
                .required(),
            data: Joi
                .object({
                    background: Joi
                        .string()
                        .required(),
                    totalPrice: Joi
                        .string()
                        .required(),
                    frame: Joi
                        .object({
                            fileURL: Joi
                                .string()
                                .required(),
                            productCode: Joi
                                .string()
                                .required(),
                            article: Joi
                                .string()
                                .required(),
                            price: Joi
                                .string()
                                .required(),
                        })
                        .required(),
                    firstItem: Joi
                        .object({
                            fileURL: Joi
                                .string()
                                .required(),
                            productCode: Joi
                                .string()
                                .required(),
                            article: Joi
                                .string()
                                .required(),
                            price: Joi
                                .string()
                                .required(),
                        })
                        .required(),
                    secondItem: Joi
                        .object({
                            fileURL: Joi
                                .string()
                                .required(),
                            productCode: Joi
                                .string()
                                .required(),
                            article: Joi
                                .string()
                                .required(),
                            price: Joi
                                .string()
                                .required(),
                        })
                        .optional(),
                    thirdItem: Joi
                        .object({
                            fileURL: Joi
                                .string()
                                .required(),
                            productCode: Joi
                                .string()
                                .required(),
                            article: Joi
                                .string()
                                .required(),
                            price: Joi
                                .string()
                                .required(),
                        })
                        .optional(),
                    fourthItem: Joi
                        .object({
                            fileURL: Joi
                                .string()
                                .required(),
                            productCode: Joi
                                .string()
                                .required(),
                            article: Joi
                                .string()
                                .required(),
                            price: Joi
                                .string()
                                .required(),
                        })
                        .optional(),
                    fifthItem: Joi
                        .object({
                            fileURL: Joi
                                .string()
                                .required(),
                            productCode: Joi
                                .string()
                                .required(),
                            article: Joi
                                .string()
                                .required(),
                            price: Joi
                                .string()
                                .required(),
                        })
                        .optional(),
                })
        })
        .validate(data);
}

function deleteItem(data) {
    return Joi
        .object({
            productCode: Joi
                .number()
                .required(),
        })
        .validate(data);
}

function deleteBackground(data) {
    return Joi
        .object({
            id: Joi
                .string()
                .required(),
        })
        .validate(data);
}

module.exports = {
    getFrame,
    getFrameColor,
    getMechanism,
    getMechanismColor,
    getBackground,
    newFrameInput,
    updateFrame,
    newFrameColorInput,
    deleteFrameColor,
    newMechanismInput,
    updateMechanism,
    newMechanismColorInput,
    deleteMechanismColor,
    inputFile,
    deleteItem,
    deleteBackground,
    pdfInput,
    loginInput,
};
