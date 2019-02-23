var Promise = require('bluebird');

var couchbase = Promise.promisifyAll(require('couchbase'));

var cluster = null;
if (process.argv[2] === 'local') {
    cluster = new couchbase.Cluster('couchbase://localhost/');
} else {
    cluster = new couchbase.Cluster('couchbase://couchbase-server');
}

cluster.authenticate('Administrator', 'password');
var myBucket = cluster.openBucket('QWayDB');
var N1qlQuery = couchbase.N1qlQuery;
var errors = couchbase.errors;

  myBucket.counter('document_name', 1, function(err, res) {
    if (err) {
      console.log('operation failed', err);
      return;
    }

    console.log('success! document_name: ', res);
  });

myBucket.counter('COMPANY::IDX', 1, {initial:10}, function(err, res) {
  if (err) {
    console.log('operation failed', err);
    return;
  }

  console.log('success! COMPANY::IDX', res);
});

myBucket.counterAsync('COMPANY::IDX::PROMISE', 1, {initial:100})
.then( res => {
  console.log('success! COMPANY::IDX::PROMISE', res);
}) 
.catch(e => {
  console.log('operation failed', err);
})