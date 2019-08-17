// products.js
'use strict'

const Router = require('koa-router')
const router = new Router({
  prefix: '/api/v1'
})

const CB = require('../model/couchbaseUtil');

// const postIssueSchema = require('../../common/schema/restApi/post.issue')

// const { Validator } = require('../lib/helper/validator')

// const ValidationError = error.Err

router.get('/products', async (ctx, next) => {

const query = "SELECT q.* FROM QWayDB q where type = 'product'"    
const rows = await CB.getAll(query)
  ctx.status = 201
  ctx.body = {
    data: rows
  }
})

module.exports = router.routes()
