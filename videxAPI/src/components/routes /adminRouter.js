const { Router } = require('express');
const adminComponents = require('../admin/controller');
const adminMiddleware = require('../admin/middleware');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const adminRouter = Router();

/**
 * Route to login admin
 * @name /login
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.post('/login', adminComponents.login);

/**
 * Route to logout admin
 * @name /login
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.post('/logout', adminMiddleware.verify, adminComponents.logout);

/**
 * Route to add new frame in database
 * @name /addFrame
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.post('/addFrame', adminMiddleware.verify, adminMiddleware.parseBody, adminComponents.newFrame);

/**
 * Route to update frames
 * @name /updateFrame
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.post('/updateFrame', adminMiddleware.verify, adminComponents.updateFrame);

/**
 * Route to delete frames
 * @name /deleteFrame
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.delete('/deleteFrame', adminMiddleware.verify, adminComponents.deleteFrame);

/**
 * Route to add new frame color in database
 * @name /addFrame
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.post('/addFrameColor', adminMiddleware.verify, adminMiddleware.parseBody, adminComponents.newFrameColor);

/**
 * Route to delete frame colors
 * @name /delete
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.delete('/deleteFrameColor', adminComponents.deleteFrameColor);

/**
 * Route to add new mechanism in database
 * @name /addFrame
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.post('/addMechanism', adminMiddleware.verify, adminMiddleware.parseBody, adminComponents.newMechanism);

/**
 * Route to update mechanisms
 * @name /update
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.post('/updateMechanism', adminMiddleware.verify, adminComponents.updateMechanism);

/**
 * Route to delete mechanisms
 * @name /deleteMechanism
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.delete('/deleteMechanism', adminMiddleware.verify, adminComponents.deleteMechanism);

/**
 * Route to add new mechanism color in database
 * @name /addFrame
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.post('/addMechanismColor', adminMiddleware.verify, adminMiddleware.parseBody, adminComponents.newMechanismColor);

/**
 * Route to delete mechanism colors
 * @name /deleteMechanismColor
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.delete('/deleteMechanismColor', adminMiddleware.verify, adminComponents.deleteMechanismColor);

/**
 * Route to add new backgrounds in database
 * @name /addBackground
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.post('/addBackground', adminMiddleware.verify, adminComponents.newBackground);

/**
 * Route to delete backgrounds
 * @name /deleteBackground
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
adminRouter.delete('/deleteBackground', adminMiddleware.verify, adminComponents.deleteBackground);

module.exports = adminRouter;
