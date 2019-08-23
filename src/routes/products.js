// products.js
'use strict'

const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1'
})

const CB = require('../model/dao/couchbaseUtil')
const defs = require('../common/definitions')
const postProductSchema = require('../common/schema/api/post.products.json')
const { Validator } = require('../common/lib/validator')
const { ProductsService } = require('../model/services/products_service')
router.post('/products', async (ctx, next) => {
    const payload = ctx.request.body

    const schemaErrors = Validator.json(postProductSchema, payload)

    let msg = 'products updated'
    if (schemaErrors != null) {
        console.error(schemaErrors)
        msg = 'Some unexpected structure'
    }

    // console.log(payload) //FIXME logger
    await ProductsService.saveAll(payload)

    ctx.status = defs.httpStatus.Created
    ctx.body = {
        message: msg
    }
})

/**
 * List of all products
 */
router.get('/products', async (ctx, next) => {

    const query = "SELECT q.* FROM QWayDB q where type = 'product'"
    const rows = await CB.getAll(query)
    ctx.status = 201
    ctx.body = {
        data: rows
    }
})

module.exports = router.routes()
