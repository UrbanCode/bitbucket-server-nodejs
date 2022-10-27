'use strict';

module.exports = function (client) {
  return {
    get: function (projectKey, repoKey, options) {
      var path = 'projects/' + projectKey + '/repos/' + repoKey + '/commits';
      
      return client.getCollection(path, options).then(function (response) {
        return response;
      });
    }
  };
};
