const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');
const filesRoutes = require('./components/routes /filesRouter');
const adminRoutes = require('./components/routes /adminRouter');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();
// static pics
app.use( '/images', express.static(path.join(__dirname, '/../src/files/pics')));
//static pdf
app.use( '/pdf', express.static(path.join(__dirname, '/../src/files/pdf')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(cookieParser());
// returns the compression middleware
app.use(compression());
// helps you to upload files from client
app.use(fileUpload());
// helps you secure your Express apps by setting various HTTP headers
app.use(helmet());
// providing a Connect/Express middleware that
// can be used to enable CORS with various options
app.use(cors());
// application routes for files
app.use(filesRoutes);
// application routes for admin
app.use('/admin', adminRoutes);
// starts app
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

module.exports = app;
