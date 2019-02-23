var Promise = require('bluebird');

var couchbase = Promise.promisifyAll(require('couchbase'));

var cluster = null;
if (process.argv[2] === 'local') {
    cluster = new couchbase.Cluster('couchbase://localhost/');
} else {
    cluster = new couchbase.Cluster('couchbase://couchbase-server');
}

cluster.authenticate('Administrator', 'password');
var bucket = cluster.openBucket('QWayDB');
var N1qlQuery = couchbase.N1qlQuery;
var errors = couchbase.errors;




function getAll(queryString) {
    let query = N1qlQuery.fromString(queryString);
    return bucket.queryAsync(query);
    // .then( (rows, meta) => {
    //     for (row in rows) {
    //         // console.log(JSON.stringify(row));
    //         if (row.id != undefined)
    //             console.log(row);
    //     }
    // })
    // .catch( err => {
    //     console.log(err);
    // });
}

function add(key, value) {
    return bucket.insertAsync(key, value);
};

function get(key) {
    try {
        return bucket.getAsync(key);
    } catch (e) {
        console.log('error when calling GET');
    }
}

function update(key, value, cas, retrieveLastVersion = false) {

    if (key === undefined || key === null) {
        return bucket.counterAsync('COMPANY::IDX::PROMISE', 1, { initial: 100 })
            .then(res => {
                console.log('success! COMPANY::IDX::PROMISE', res.value);
                key = `COMPANY::${res.value}`;
                console.log('REST...');
                console.log(key);
                value.id = key;
                return bucket.upsertAsync(key, value, { 'cas': cas })
                    .catch(err => {
                        console.log('### Caught!' + err.code)
                        console.log('### Caught! errors.keyAlreadyExists' + errors.keyAlreadyExists)

                        if (err != undefined && err.code === errors.keyAlreadyExists && retrieveLastVersion === false) {
                            return new Promise((resolve, reject) => {
                                return reject(409) /// need to return reject(409)put more generic error
                            })
                        }

                        return new Promise((resolve, reject) => {
                            return reject(err) /// need to put more generic error
                        })
                    }
                    );
            })
            .catch(e => {
                console.log('operation failed', e);
            })
    } else {
        return bucket.upsertAsync(key, value, { 'cas': cas })
            .catch(err => {
                console.log('### Caught!' + err.code)
                console.log('### Caught! errors.keyAlreadyExists' + errors.keyAlreadyExists)

                if (err != undefined && err.code === errors.keyAlreadyExists && retrieveLastVersion === false) {
                    return new Promise((resolve, reject) => {
                        return reject(409) /// need to return reject(409)put more generic error
                    })
                }

                return new Promise((resolve, reject) => {
                    return reject(err) /// need to put more generic error
                })
            }
            );
    }

}

module.exports = {
    add,
    get,
    update,
    getAll
}