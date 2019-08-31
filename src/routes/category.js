// category.js
'use strict'

const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1'
})

const defs = require('../common/definitions')
const { CategoryService } = require('../model/services/category_service')

/**
 * return a list of fruits: apple, banana...
 */
router.get('/category/subCategory/:id', async (ctx, next) => {
    console.log(ctx.params.id.toUpperCase())
    console.log('= = = + = = =')
    // await next()
    try {
        const service = new CategoryService()

        const subCategories = await service.getSubCategories(defs.subCategory[ctx.params.id.toUpperCase()])

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
