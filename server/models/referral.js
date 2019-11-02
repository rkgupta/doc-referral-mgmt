/**
 * Created by cpapernik on 9/13/16.
 */
'use strict';
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var referralSchema = new mongoose.Schema({
  referralType: String,
  referralUnit: Number,
  doctor: String,
  text: String,
  timestamp: Date
});

referralSchema.plugin(AutoIncrement, { inc_field: 'id' });

referralSchema.index({ doctor: 1 });
referralSchema.index({ text: 1 });
referralSchema.index({ referralType: 1 });
referralSchema.index({ timestamp: 1, text: 1 });

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
