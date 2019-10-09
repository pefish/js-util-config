
import yaml from 'js-yaml'
import fs from 'fs'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any,
    }
  }
}

export interface Configuration {
  configFilePath?: string
  secretFilePath?: string
  configEnvName?: string
  secretEnvName?: string
}

export default class Config {
  static loadJsonConfig (config: Configuration = {
    configEnvName: `NODE_CONFIG`,
    secretEnvName: `NODE_SECRET`
  }): {[x: string]: any} {
    let configFile = ``, configData = {}
    if (config.configEnvName || config.configFilePath) {
      if (config.configEnvName) {
        configFile = process.env[config.configEnvName]
      } else if (config.configFilePath) {
        configFile = config.configFilePath
      }
      if (configFile) {
        configData = require(configFile)
      }
    }

    let secretFile = ``, secretData = {}
    if (config.secretEnvName || config.secretFilePath) {
      if (config.secretEnvName) {
        secretFile = process.env[config.secretEnvName]
      } else if (config.secretFilePath) {
        secretFile = config.secretFilePath
      }
      if (secretFile) {
        secretData = require(secretFile)
      }
    }

    if (!configFile && !secretFile) {
      throw new Error(`unspecified config file and secret file`)
    }

    return Object.assign(configData, secretData)
  }

  static loadYamlConfig (config: Configuration = {
    configEnvName: `NODE_CONFIG`,
    secretEnvName: `NODE_SECRET`
  }): {[x: string]: any} {
    let configFile = ``, configData = {}
    if (config.configEnvName || config.configFilePath) {
      if (config.configEnvName) {
        configFile = process.env[config.configEnvName]
      } else if (config.configFilePath) {
        configFile = config.configFilePath
      }
      if (configFile) {
        configData = yaml.safeLoad(fs.readFileSync(configFile, 'utf8'))
      }
    }

    let secretFile = ``, secretData = {}
    if (config.secretEnvName || config.secretFilePath) {
      if (config.secretEnvName) {
        secretFile = process.env[config.secretEnvName]
      } else if (config.secretFilePath) {
        secretFile = config.secretFilePath
      }
      if (secretFile) {
        secretData = yaml.safeLoad(fs.readFileSync(secretFile, 'utf8'))
      }
    }

    if (!configFile && !secretFile) {
      throw new Error(`unspecified config file and secret file`)
    }

    return Object.assign(configData, secretData)
  }
}
