const { couchbasePromise } = require('../../common/lib/couchbasePromise')

class CounterUtils {
    constructor(bucket, inc = 1, initial = 900000000) {
        this._cluster = null
        this._cluster = new couchbasePromise.Cluster('couchbase://localhost/')

        // if (process.argv[2] === 'local') {
        //     this._cluster = new couchbasePromise.Cluster('couchbase://localhost/')
        // } else {
        //     this._cluster = new couchbasePromise.Cluster('couchbase://couchbase-server')
        // }

        this._cluster.authenticate('Administrator', 'password')
        this._bucket = this._cluster.openBucket(bucket)

        this.setInc(inc)
        this.setInitial(initial)
    }

    setInc(inc){
        this._inc = inc
    }

    setInitial(initial){
        this._initial = initial
    }

    async next(docIdDefs) {
        return await this._bucket.counterAsync(docIdDefs, this._inc, {initial: this._initial})
    }
}

module.exports = { CounterUtils }