const express = require('express');
const authRouter = express.Router();
const { auth, redirect } = require('../controllers/authController.js');

// Define the auth route
authRouter.get('/', auth);
authRouter.get('/redirect', redirect);

module.exports =  authRouter;
