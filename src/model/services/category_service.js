const CB = require('../dao/couchbaseUtil')
const defs = require('../../common/definitions')
const Logger = require('../../common/lib/logger')('service/category_service.js')

class CategoryService {
    constructor() {
    }

    async getSubCategories(categoryProduct) {

        if (categoryProduct) {
            const subCategory = defs.subCategory[categoryProduct.toUpperCase()]
            if (subCategory) {
                const subCats = await CB.get(subCategory)
                return subCats
            }
            Logger.db('Unexpected category : ' + categoryProduct)
        }
        Logger.db('Unexpected category : ' + categoryProduct)
    }
}

module.exports = { CategoryService }