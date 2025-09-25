/** @format */

const Controller = require('../controllers/Test');
const authentication = require('../middleware/Authentication');

const testRoute = require('express').Router();

testRoute.get('/', Controller.getAll);

module.exports = testRoute;
