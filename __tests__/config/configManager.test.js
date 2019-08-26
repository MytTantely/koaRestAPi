const { ConfigManager } = require('../../config/configManager')

const configManager = new ConfigManager()
configManager.getConfig()
configManager._check()
