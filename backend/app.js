const express = require('express');
const app = express();
const util = require('util');
const https = require('https');
const path = require('path');
const fs = require('fs');
const routes = require('./routes');
const morgan = require('morgan');
const cors = require('cors');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const fileupload = require('express-fileupload');

dotenv.config();

app.use(cors());
app.use(
	morgan('dev', {
		skip: function (req, res) {
			return res.statusCode >= 400;
		},
		stream: process.stdout,
	})
);
app.use(
	express.json({
		limit: '2mb',
		verify: (req, res, buf) => {
			req.rawBody = buf.toString();
		},
	})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	fileupload({
		limits: { fileSize: 50 * 1024 * 1024 },
	})
);
// app.use(middleware);

app.use(
	morgan('dev', {
		skip: function (req, res) {
			return res.statusCode >= 400;
		},
		stream: process.stdout,
	})
);
const userController = routes.userController;
const adminController = routes.adminController;
const API_URL = '/api/v1/';
app.use(API_URL, userController);
app.use(API_URL, adminController);


app.listen(3000, function () {
  console.log('Example app listening on port!', 3000);
});