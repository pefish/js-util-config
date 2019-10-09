import Config from './config';

describe('test config', () => {
  it('loadJsonConfig', async function () {
    const result = Config.loadYamlConfig()
    console.log(result)
  });
})
