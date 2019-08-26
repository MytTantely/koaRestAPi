const { promisify } = require('util')
const fs = require('fs')
const fsReadFilePromise = promisify(fs.readFile)
const { Validator } = require('../src/common/lib/validator')
const configurationSchema = require('../src/common/schema/conf/configSchema.json')
const jp = require('jsonpath')

const _ = require('underscore')

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
            // console.log(this.defaultConfig)
        } catch (error) {
            console.log(error)
        }
    }

    _check() {
        // const defaultKeys = Object.keys(this.defaultConfig)
        // const envKeys = Object.keys(this.envConfig)
        // console.log(this.defaultConfig)
        // this._listOfKeys(this.defaultConfig, this.envConfig)

        console.log(Object.keys(this.envConfig.db.password))
        // for (const keyEnv of envKeys) {
        //     // console.log(jp.query(this.envConfig, `$.${keyEnv}..*`))
        //     this.defaultConfig[keyEnv] = this.envConfig[keyEnv]
        //     // jp.query(this.envConfig, `$.${keyEnv}..*`)
        //     // console.log(keyEnv)
        // }
        console.log(' = = = = = = = = = = = = = = ')

        // console.log(this.defaultConfig)

    }

    _listOfKeys(_objDest, _objOrigin) {
        const keysOrigin = Object.keys(_objOrigin)
        console.log(keysOrigin)
        console.log('= = = = = = = = = = = = = = = = =')
        for (const eachKeyOrigin of keysOrigin) {
            this._listOfKeys( _objDest[eachKeyOrigin], _objOrigin[eachKeyOrigin])
            _objDest[eachKey] = _objOrigin[eachKey]
        }
    }
}

module.exports = { ConfigManager }