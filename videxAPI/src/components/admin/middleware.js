const adminService = require('../../database/services/adminService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
require('dotenv').config();

async function getToken(data) {
    const accessToken = jwt.sign({ login: data.login }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES});

    return { accessToken };
}

async function validateAdmin(login, password) {
    const user = await adminService.getByLogin(login);

    if(!user) {
        throw new Error('Wrong login');
    }
    const passwordCompared = await bcrypt.compare(password, user.password);

    if (!passwordCompared) {
        throw new Error('Wrong password!');
    }
    return { login: user.login };
}

async function verify(req, res, next) {
    try {
        const verified = await jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);

        if (verified) {
            return next();
        }

        return res.status(401).json({
            message: 'Please login',
        });

    } catch (error) {
        res.status(401).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

function parseBody(req, res, next) {
    req.body = JSON.parse(req.body.data);
    return next();
}

function writeFile(path, data) {
    fs.writeFile(path, data, (error) => {
        if (error) console.error(error);
    });

    return true;
}

function deleteFile(path) {
   return   fs.unlink(path, (error) => {
        if (error) console.error(error);
    });
}

module.exports = {
    getToken,
    validateAdmin,
    parseBody,
    writeFile,
    deleteFile,
    verify,
};
