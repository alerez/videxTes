const { Router } = require('express');
const fileComponents = require('../files/controller');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const filesRouter = Router();

/**
 * Route to make pdf file
 * @name /pdf
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
filesRouter.get('/pdf', fileComponents.getPdf);

/**
 * Route to get frames
 * @name /getFrames
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
filesRouter.get('/getFrames', fileComponents.getFrames);

/**
 * Route to get frames colors
 * @name /getFrameColors
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
filesRouter.get('/getFramesColors', fileComponents.getFrameColors);

/**
 * Route to get mechanisms
 * @name /getMechanism
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
filesRouter.get('/getMechanisms', fileComponents.getMechanisms);

/**
 * Route to get mechanisms colors
 * @name /getMechanismColors
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
filesRouter.get('/getMechanismColors', fileComponents.getMechanismColors);

/**
 * Route to get backgrounds
 * @name /getBackgrounds
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
filesRouter.post('/getBackgrounds', fileComponents.getBackgrounds);

module.exports = filesRouter;
