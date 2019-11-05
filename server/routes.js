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

router.get('/referrals', referralCtrl.findAll);
router.get('/referrals/:id', referralCtrl.findone);
router.post('/referrals', referralCtrl.create);
router.put('/referrals/:id', referralCtrl.update);
router.delete('/referrals/:id', referralCtrl.delete);

router.get('/doctors', doctorCtrl.findAll);
router.get('/doctors/:id', doctorCtrl.findone);
router.post('/doctors', doctorCtrl.create);
router.put('/doctors/:id', doctorCtrl.update);
router.delete('/doctors/:id', doctorCtrl.delete);

module.exports = router;
