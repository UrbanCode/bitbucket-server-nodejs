'use strict';

var async = require('async');
var utils = require('lodash');
var Promise = require('bluebird');

module.exports = function (client) {
  var repos = require('./repos')(client);
  return {
    get: function (projectKey, repo, pullRequestId, options) {
      if (!options) {
        options = {};
      }

      var clientOptions = { args: { 'start': options.start || 0, 'limit': options.limit || 1000 } };
      var path = 'projects/' + projectKey + '/repos/' + repo + '/pull-requests/' + pullRequestId + '/activities';

      return client.getCollection(path, clientOptions).then(function (response) {
        return response;
      });
    }
  }
};
