const Logger = require('../../../src/common/lib/logger')('logger.test.js')
const data = require('../../../misc/database.json')

Logger.info('Test info')
Logger.warn('Test warn')
// Logger.error('Test error', {data})
Logger.db('Test db', {
    data
})

Logger.error('Test error', {
    small: "NOT Fat Guy"
})