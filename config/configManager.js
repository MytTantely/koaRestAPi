const { promisify } = require('util')
const fs = require('fs')
const fsReadFilePromise = promisify(fs.readFile)
const { Validator } = require('../src/common/lib/validator')
const configurationSchema = require('../src/common/schema/conf/configSchema.json')
const merge = require('merge')
class ConfigManager {
    constructor() {
    }

    async getConfig() {
        try {
            // const defaultConfigPromise = fsReadFilePromise('defaultConfig.json', "utf8")
            // const envConfigPromise = fsReadFilePromise('envConfig.json', "utf8")
            // this.defaultConfig = await defaultConfigPromise
            // this.envConfig = await envConfigPromise
            this.defaultConfig = require('./default/defaultConfig.json')
            this.envConfig = require('./env/envConfig.json')

            const schemaEnvErrors = Validator.json(configurationSchema, this.envConfig)
            const schemaDefaultErrors = Validator.json(configurationSchema, this.defaultConfig)

            if (schemaEnvErrors != null) { // FIXME Should throw exception
                const msg = 'Some unexpected structure for envConfig.json'
                console.log(msg)
                console.error(schemaEnvErrors)
            }

            if (schemaDefaultErrors != null) {
                msg = 'Some unexpected structure for defaultConfig.json'
                console.log(msg)
                console.error(schemaDefaultErrors)
            }

            const merged = merge.recursive(true, this.defaultConfig, this.envConfig)
            return merged
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = { ConfigManager }