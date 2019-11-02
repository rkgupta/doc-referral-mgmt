const mongoose = require('mongoose');
const logger = require('../utils/logger').logger;
const utils = require('../utils/utils');
const Doctor = require('../models/doctor');

module.exports.create = function(req, res) {
  const doctor = new Doctor({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address
  });

  doctor
    .save()
    .then(doc => {
      logger.info('Successfully saved a new doctor.');
      utils.send200(res, 'Successfully saved a new doctor with name: ' + doc.name + ' on ' + new Date());
    })
    .catch(err => {
      logger.error('Error while saving a new doctor ' + err);
      utils.send500(res, err);
    });
};

module.exports.findone = function(req, res) {
  Doctor.find({ id: Number(req.params.id) })
    .then(doc => {
      if (!doc) {
        return utils.send404(res);
      }
      res.send(doc[0]);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return utils.send404(res);
      }
      return utils.send500(res, {
        message: 'Error retrieving Doctor with id ' + req.params.id
      });
    });
};

module.exports.findAll = function(req, res) {
  logger.info('Doctor > searching for doctors');

  res.locals.limit = res.locals.limit || 200;

  Doctor.find(res.locals.filter)
    .limit(res.locals.limit)
    .sort({ timestamp: -1 })
    .lean(true)
    .exec(function(err, docs) {
      if (err) {
        logger.error(err);
        utils.send500(res, err);
      } else {
        utils.send200(res, docs);
      }
    });
};

module.exports.update = function(req, res) {
  logger.info('Referral > saving referral');

  // Find referral and update it with the request body
  Doctor.findOneAndUpdate(
    { id: Number(req.params.id) },
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address
    },
    { new: true }
  )
    .then(doc => {
      if (!doc) {
        return utils.send404(res);
      }
      utils.send200(res, doc);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return utils.send404(res);
      }
      return utils.send500(res, err);
    });
};

module.exports.delete = function(req, res) {
  Doctor.findOneAndDelete({ id: Number(req.params.id) })
    .then(doc => {
      if (!doc) {
        return utils.send404(res);
      }
      utils.send200(res, 'Deleted doctor with id: ' + doc.id);
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return utils.send404(res);
      }
      return utils.send500(res, { msg: 'Could not delete the doctor' });
    });
};
