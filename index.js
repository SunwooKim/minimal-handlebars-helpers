'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var helpers = require('./lib');

helpers.register = function (Handlebars, namespaces) {
  var targets = namespaces ? [].concat.apply([], [namespaces]).filter(function (e) {
    return e && _typeof(helpers[e]) === 'object';
  }) : null;

  if (!Handlebars || typeof Handlebars.registerHelper !== 'function') {
    throw new Error('Handlebars.registerHelper is undefined.');
  }

  Object.keys(helpers).forEach(function (e) {
    if (_typeof(helpers[e]) !== 'object') {
      return;
    }
    if (targets === null || targets.indexOf(e) !== -1) {
      Object.keys(helpers[e]).forEach(function (name) {
        if (typeof helpers[e][name] === 'function' && !(name in Handlebars.helpers)) {
          Handlebars.registerHelper(name, helpers[e][name]);
        }
      });
    }
  });

  var moment  = require('moment-timezone');
  var _       = require('lodash');

  Handlebars.registerHelper('moment', function (context, block) {
    if (context && context.hash) {
      block = _.cloneDeep(context);
      context = undefined;
    }
    var date = moment(context);
    
    if (block.hash.timezone){
      date.tz(block.hash.timezone);
    }

    var hasFormat = false;

    // Reset the language back to default before doing anything else
    date.lang('en');

    for (var i in block.hash) {
      if (i === 'format') {
        hasFormat = true;
      }
      else if (date[i]) {
        date = date[i](block.hash[i]);
      } else {
        console.log('moment.js does not support "' + i + '"');
      }
    }

    if (hasFormat) {
      date = date.format(block.hash.format);
    }
    return date;
  });

};

module.exports = helpers;
