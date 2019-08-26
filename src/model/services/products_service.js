const { Validator } = require('../../common/lib/validator')
const fruitsSchema = require('../../common/schema/db/fruits.json')
const CB = require('../dao/couchbaseUtil')
const defs = require('../../common/definitions')
const { CounterUtils } = require('../../model/dao/counter')

class ProductsService {
    constructor() { 
        this._counter = new CounterUtils('QWayDB')
    }

    async getIndex(){
        const index = await this._counter.next(defs.prefix.PRODUCT_FRUITS)
        return index.value
    }

    async saveAll(products) {
        console.log('= = = = = = saveAll = = = = = =')
        console.log(' Products length : ' + products.length)

        for (const product of products) {
            const schemaErrors = Validator.json(fruitsSchema, product)
            if (schemaErrors === null) {
                let index = await this.getIndex()
                CB.add(defs.prefix.PRODUCT_FRUITS + product.subCategory.toUpperCase() + '#' + index, product)
            }else {
                console.log(schemaErrors)
            }
            console.log(product.name)
        }
    }
}

module.exports = { ProductsService }