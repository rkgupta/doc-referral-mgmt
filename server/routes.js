/**
 * Created by cpapernik on 9/13/16.
 */
'use strict';
const express = require('express');
const router = express.Router();
const utils = require('./utils/utils');
const mongoose = require('mongoose');

const referralCtrl = require('./controllers/referral-ctrl');
const doctorCtrl = require('./controllers/doctor-ctrl');

// Middleware for parsing query parameters and creating a filter
router.use(function(req, res, next) {
  // Set Filter
  res.locals.filter = utils.getFilter(req);
  // Set Limit
  res.locals.limit = utils.getLimit(req);

  next();
});

router.get('/prescriptions', referralCtrl.findAll);
router.get('/prescriptions/:id', referralCtrl.findone);
router.post('/prescriptions', referralCtrl.create);
router.put('/prescriptions/:id', referralCtrl.update);
router.delete('/prescriptions/:id', referralCtrl.delete);

router.get('/doctors', doctorCtrl.findAll);
router.get('/doctors/:id', doctorCtrl.findone);
router.post('/doctors', doctorCtrl.create);
router.put('/doctors/:id', doctorCtrl.update);
router.delete('/doctors/:id', doctorCtrl.delete);

module.exports = router;
