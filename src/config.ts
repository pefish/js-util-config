
import yaml from 'js-yaml'
import fs from 'fs'

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
      }
      if (!configFile && config.configFilePath) {
        configFile = config.configFilePath
      }
      if (configFile) {
        try {
          configData = require(configFile)
        } catch (err) {
          // console.debug(err)
        }
      }
    }

    let secretFile = ``, secretData = {}
    if (config.secretEnvName || config.secretFilePath) {
      if (config.secretEnvName) {
        secretFile = process.env[config.secretEnvName]
      }
      if (!secretFile && config.secretFilePath) {
        secretFile = config.secretFilePath
      }
      if (secretFile) {
        try {
          secretData = require(secretFile)
        } catch (err) {
          // console.debug(err)
        }
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
      }
      if (!configFile && config.configFilePath) {
        configFile = config.configFilePath
      }
      if (configFile) {
        try {
          configData = yaml.safeLoad(fs.readFileSync(configFile, 'utf8'))
        } catch (err) {
          // console.debug(err)
        }
      }
    }

    let secretFile = ``, secretData = {}
    if (config.secretEnvName || config.secretFilePath) {
      if (config.secretEnvName) {
        secretFile = process.env[config.secretEnvName]
      }
      if (!secretFile && config.secretFilePath) {
        secretFile = config.secretFilePath
      }
      if (secretFile) {
        try {
          secretData = yaml.safeLoad(fs.readFileSync(secretFile, 'utf8'))
        } catch (err) {
          // console.debug(err)
        }
      }
    }

    if (!configFile && !secretFile) {
      throw new Error(`unspecified config file and secret file`)
    }

    return Object.assign(configData, secretData)
  }
}
