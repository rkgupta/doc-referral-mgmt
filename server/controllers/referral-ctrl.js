const mongoose = require('mongoose');
const utils = require('../utils/utils');
const logger = require('../utils/logger').logger;
const slugify = require('slugify');

const Referral = require('../models/referral');

module.exports.findAll = function(req, res) {
  logger.info('Referral > searching for referrals');

  res.locals.limit = res.locals.limit || 200;

  Referral.find(res.locals.filter)
    .limit(res.locals.limit)
    .sort({ timestamp: -1 })
    .lean(true)
    .exec(function(err, referrals) {
      if (err) {
        logger.error(err);
        utils.send500(res, err);
      } else {
        utils.send200(res, referrals);
      }
    });
};

module.exports.findone = function(req, res) {
  Referral.find({ id: Number(req.params.id) })
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
        message: 'Error retrieving referral with id ' + req.params.id
      });
    });
};
/**
 * Add a new referral to the system
 */
module.exports.create = function(req, res) {
  logger.info('Referral > saving referral');

  const referralToSave = new Referral({
    doctor: req.body.doctor,
    text: slugify(req.body.doctor, {
      replacement: '-',
      remove: /[*+~.()'"!:@]/g,
      lower: true
    }),
    referralType: req.body.referralType,
    referralUnit: req.body.referralUnit,
    timestamp: new Date()
  });

  referralToSave
    .save()
    .then(data => {
      logger.info('Successfully saved a new referral.');
      utils.send200(res, 'Successfully saved a new referral on: ' + data.timestamp);
    })
    .catch(err => {
      logger.error('Error while saving a new referral ' + err);
      utils.send500(res, err);
    });
};

module.exports.update = function(req, res) {
  logger.info('Referral > saving referral');

  // Find referral and update it with the request body
  Referral.findOneAndUpdate(
    { id: Number(req.params.id) },
    {
      doctor: req.body.doctor,
      text: slugify(req.body.doctor, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true
      }),
      referralType: req.body.referralType,
      referralUnit: req.body.referralUnit,
      timestamp: new Date()
    },
    { new: true }
  )
    .then(referral => {
      if (!referral) {
        return utils.send404(res);
      }
      utils.send200(res, referral);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return utils.send404(res);
      }
      return utils.send500(res, err);
    });
};

module.exports.delete = function(req, res) {
  logger.info('Referral > saving referral');

  Referral.findOneAndDelete({ id: Number(req.params.id) })
    .then(doc => {
      if (!doc) {
        return utils.send404(res);
      }
      utils.send200(res, 'Deleted referral with id: ' + doc.id);
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return utils.send404(res);
      }
      return utils.send500(res, { msg: 'Could not delete the referral with id: ' + req.params.id });
    });
};
