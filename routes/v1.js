'use strict';

const express = require('express');
const router = express.Router();
const V1Controller = require('../controllers/V1Controller');

// All routes are POST as per the documentation
router.post('/connect', V1Controller.connect);
router.post('/add', V1Controller.add);
router.post('/delete', V1Controller.delete);
router.post('/query', V1Controller.query);
router.post('/check_registration', V1Controller.checkRegistration);
router.post('/query_images', V1Controller.queryImages);
router.post('/firmware_upgrade', V1Controller.firmwareUpgrade);
router.post('/pass_list', V1Controller.passList);
router.post('/query_batch_import_path', V1Controller.queryBatchImportPath);

module.exports = router;
