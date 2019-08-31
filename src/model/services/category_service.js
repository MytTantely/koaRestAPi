const CB = require('../dao/couchbaseUtil')

class CategoryService {
    constructor () {
    }

    async getSubCategories(categoryProduct) {
        if (categoryProduct) {
            const subCats = await CB.get(categoryProduct)
            return subCats
        }
    }
}

module.exports = { CategoryService }