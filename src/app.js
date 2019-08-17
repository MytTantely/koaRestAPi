'use strict'
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const cors = require('koa2-cors')

const products = require('./routes/products')

// init
const app = new Koa()
app.use(koaLogger())
app.use(bodyParser())

app.use(cors({
    origin: function (ctx) {
      // if (ctx.url === '/test') {
      //     return false;
      // }
      return '*'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  }))

  app.use(products)

  app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
  
    ctx.status = error.HTTP_STATUS.InternalError
    ctx.body = {
      status: 'error',
      message: `Please contact the administrator. ${err.message}`
    }
  })
  
  module.exports.app = app