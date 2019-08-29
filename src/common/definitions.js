'use strict'

const _prefix = {
  PRODUCT_FRUITS: 'PRODUCT::FRUITS::',
  STORE_GROCERY: 'STORE::GROCERY::'
}

const _type = {
  PRODUCT: 'product'
}

const _httpStatus = {
    OK : 200,
    Created: 201,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403 
}

const _category = {
  FRUITS: 'fruits'
}

module.exports.httpStatus = Object.freeze(_httpStatus)
module.exports.prefix = Object.freeze(_prefix)
module.exports.type = Object.freeze(_type)
module.exports.category = Object.freeze(_category)