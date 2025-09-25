/** @format */

const v1Route = require('./v1'); // Import the new v1 router

const router = require('express').Router();

router.use('/v1', v1Route); // Use the v1 router for /v1 paths

module.exports = router;
