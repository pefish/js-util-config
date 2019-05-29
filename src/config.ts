import * as path from 'path'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any,
    }
  }
}

export default class Config {
  static loadConfig (defaultConfigFile: string = null): any {
    const envNodeConfig = process.env[`NODE_CONFIG`]
    const envNodeSecret = process.env['NODE_SECRET']
    if (envNodeConfig || envNodeSecret) {
      let config = {}
      try {
        config = require(envNodeConfig)
      } catch (err) {
        global.logger.info(`config config not exists. ${envNodeConfig}`)
      }
      let secret = {}
      try {
        secret = require(envNodeSecret)
      } catch (err) {
        global.logger.info(`secret config not exists. ${envNodeSecret}`)
      }
      return Object.assign(config, secret)
    }

    if (defaultConfigFile) {
      return require(defaultConfigFile)
    }

    const configPath = path.join(process.cwd(), `${process.env['EXE_PATH'] || 'src'}/config`)
    const env = process.env['NODE_ENV']
    return require(path.join(configPath, `${env}.json`))
  }
}
