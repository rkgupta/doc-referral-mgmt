/**
 * Created by cpapernik on 9/13/16.
 */
'use strict';
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String
});

doctorSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'doctor_id_counter' });

doctorSchema.index({ name: 1 });

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
