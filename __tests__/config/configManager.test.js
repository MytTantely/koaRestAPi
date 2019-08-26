const { ConfigManager } = require('../../config/configManager')

const configManager = new ConfigManager()

const toto = async () => {
    const config = await configManager.getConfig()
    console.log(config)
}

toto()