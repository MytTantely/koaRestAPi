// category.js
'use strict'

const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1'
})

const defs = require('../common/definitions')
const { CategoryService } = require('../model/services/category_service')

const Logger = require('../common/lib/logger')('routes/category.js')
/**
 * return a list of fruits: apple, banana...
 */
router.get('/category/subCategory/:id', async (ctx, next) => {
    Logger.warn(ctx.params.id.toUpperCase())
    // FIXME NEED TO CHECK params?
    try {
        const service = new CategoryService()

        const subCategories = await service.getSubCategories(ctx.params.id)

        ctx.status = defs.httpStatus.Created
        ctx.body = {
            subCategories
        }
    } catch (error) {
        ctx.status = defs.httpStatus.BadRequest
        ctx.body = {
            message : error.message
        }
    }
})

module.exports = router.routes()
