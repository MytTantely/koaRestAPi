const { Validator } = require('../../common/lib/validator')
const fruitsSchema = require('../../common/schema/db/fruits.json')
const CB = require('../dao/couchbaseUtil')
const defs = require('../../common/definitions')
const { CounterUtils } = require('../../model/dao/counter')

const payloadSchema = require('../../common/schema/api/post.products.json')
const Logger = require('../../common/lib/logger')('products_service.js')

class ProductsService {
    constructor() {
        this._counter = new CounterUtils('QWayDB')
    }

    async getIndex() {
        const index = await this._counter.next(defs.prefix.PRODUCT_FRUITS)
        return index.value
    }

    async getSchema(category) {
        switch (category) {
            case defs.category.FRUITS:
                return fruitsSchema
            default:
                return fruitsSchema // will be something that make schema errors
        }
    }

    async saveAll(products) {
        // Check if this is an array
        const schemaPayloadErrors = Validator.json(payloadSchema, products)
        if (schemaPayloadErrors !== null) {
            const errMsg = 'Not expected payload, ' + schemaPayloadErrors
            Logger.db(errMsg, { products })
            throw new Error(errMsg)
        }

        let counter = 0
        for (const product of products) {
            // FIXME need to know which product, which product schema to use?
            const schema = await this.getSchema(product.category)
            
            const schemaErrors = Validator.json(schema, product)
            if (schemaErrors === null) {
                let index = await this.getIndex()
                CB.add(defs.prefix.PRODUCT_FRUITS + product.subCategory.toUpperCase() + '#' + index, product)
                counter++
            } else {
                Logger.db('Not expected product, ' + schemaErrors, { product })
            }
        }
        Logger.info(`${counter}/${products.length} inserted correctly.`)
    }
}

module.exports = { ProductsService }