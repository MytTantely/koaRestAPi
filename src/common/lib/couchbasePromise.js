const Promise = require('bluebird');

const couchbasePromise = Promise.promisifyAll(require('couchbase'));

module.exports = { couchbasePromise }