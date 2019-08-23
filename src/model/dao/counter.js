const { couchbasPromise } = require('../../common/lib/couchbasePromise')

class CounterUtils {
    constructor(bucket) {
        this._cluster = null
        if (process.argv[2] === 'local') {
            this._cluster = new couchbase.Cluster('couchbase://localhost/')
        } else {
            this._cluster = new couchbase.Cluster('couchbase://couchbase-server')
        }

        this._cluster.authenticate('Administrator', 'password')
        this._bucket = this._cluster.openBucket(bucket)

        // this.inc = 1
        this.setInc(1)
        this.setInitial(900000000)
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