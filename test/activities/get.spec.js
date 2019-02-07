var assert = require('assert');
var sinon = require('sinon');
var BitbucketClient = require('../../index.js').Client;
var request = require('request-promise');
var Promise = require('bluebird');

describe('Activities', function () {
  var requestGet, bitbucketClient;
  var oauth = require('../mocks/oauth');

  beforeEach(function () {
    bitbucketClient = new BitbucketClient('http://localhost/', oauth);
    requestGet = sinon.stub(request, 'get');
  });

  afterEach(function () {
    request.get.restore();
  });

  it('should get list of activities for a pull-request', function (done) {
    // Mock the HTTP Client get.
    var expected = require('../mocks/activities.json');
    requestGet.returns(Promise.resolve(expected));

    // Test repos.get API.
    bitbucketClient.activities.get('PRJ', 'my-repo', 1)
      .then(function (activities) {
        assert.equal(activities.size, 1);
        assert.deepEqual(activities.values[ 0 ], expected.values[ 0 ]);
        assert.equal(requestGet.getCall(0).args[ 0 ].uri, 'http://localhost/projects/PRJ/repos/my-repo/pull-requests/1/activities?limit=1000&start=0');

        done();
      });
  });
});
