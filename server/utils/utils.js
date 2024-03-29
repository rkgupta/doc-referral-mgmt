'use strict';
const slugify = require('slugify');

/*
 *  200 Response with data
 */
module.exports.send200 = function(res, data) {
  res.status(200);
  res.set('X-Total-Count', res.locals.totalCount);
  res.json(data);
};

/*
 *  404 response
 */
module.exports.send404 = function(res) {
  res.status(404);
  res.json({
    diagnostics: { filter: res.locals.filter, limit: res.locals.limit },
    status: 'error'
  });
};

/*
 *  500 response with error
 */
module.exports.send500 = function(res, err) {
  res.status(500);
  res.json({
    diagnostics: { filter: res.locals.filter, limit: res.locals.limit },
    status: 'error',
    error: err
  });
};

/*
 *  Parses request query parameters to create the mongoose query filter
 */
module.exports.getFilter = function(req) {
  var filter = {};

  if (req.query.doctor) {
    filter.text = slugify(req.query.doctor, {
      replacement: '-',
      remove: /[*+~.()'"!:@]/g,
      lower: true
    });
  }
  if (req.query.referralType) {
    filter.referralType = req.query.referralType;
  }

  // Start Date
  var startDate;
  if (req.query.startDate) {
    startDate = new Date(req.query.startDate);
    startDate.setUTCHours(0, 0, 0, 0);
  }

  // End Date
  var endDate;
  if (req.query.endDate) {
    endDate = new Date(req.query.endDate);
    endDate.setUTCHours(23, 59, 59, 999);
  }
  let dataFilter = {};
  if (startDate) {
    dataFilter['$gte'] = startDate;
  }
  if (endDate) {
    dataFilter['$lte'] = endDate;
  }
  if (dataFilter.hasOwnProperty('$gte') || dataFilter.hasOwnProperty('$lte')) {
    filter.timestamp = dataFilter;
  }

  return filter;
};

module.exports.getAsOfDate = function(req) {
  var asOfDate;
  if (req.query.startDate) {
    asOfDate = new Date(req.query.startDate);
  } else {
    asOfDate = new Date();
  }
  asOfDate.setUTCHours(0, 0, 0, 0);

  return asOfDate;
};

/*
 *  Parses request query parameters for a limit
 */
module.exports.getLimit = function(req) {
  if (!isNaN(req.query._start) && !isNaN(req.query._end)) {
    var limit = parseInt(req.query._end) - parseInt(req.query._start);
    if (limit > 0) {
      return limit;
    }
  }
  return 200;
};

/*
 *  Parses request query parameters for a page
 */
module.exports.getPage = function(req) {
  if (!isNaN(req.query._start)) {
    var skip = parseInt(req.query._start);
    if (skip > 0) {
      return skip;
    }
  }
  return 0;
};

/*
 *  Makes keys in a JSON object lowercase
 */
module.exports.jsonObjectKeysToLowercase = function(jsonObj) {
  Object.keys(jsonObj).forEach(function(key) {
    var k = key.toLowerCase();

    if (k !== key) {
      jsonObj[k] = jsonObj[key];
      delete jsonObj[key];
    }
  });

  return jsonObj;
};
