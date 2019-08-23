const { Validator } = require('../../common/lib/validator')
const fruitsSchema = require('../../common/schema/db/fruits.json')
const CB = require('../dao/couchbaseUtil')
const defs = require('../../common/definitions')
let index = 10
class ProductsService {
    constructor() { }

    static async saveAll(products) {
        console.log('= = = = = = saveAll = = = = = =')
        console.log(' Products length : ' + products.length)


        for (const product of products) {

            ++index
            const schemaErrors = Validator.json(fruitsSchema, product)
            if (schemaErrors === null) {
                CB.add(defs.prefix.PRODUCT_FRUITS + product.subCategory + index, product)
            }else {
                console.log(schemaErrors)
            }
            console.log(product.name)
        }
    }
}

module.exports = { ProductsService }