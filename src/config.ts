import SequelizeHelper from "@pefish/js-helper-mysql";

export default class Config {
  static async fetchConfigsFromDb(
    mysqlInstance: SequelizeHelper,
    names: string[]
  ): Promise<{
    [x: string]: string;
  }> {
    // 查询数据库获取配置
    const rows: {
      key: string;
      value: string;
    }[] = await mysqlInstance.select({
      select: "*",
      from: "config",
    });

    // 创建一个 Map 来存储结果
    const result: { [key: string]: string } = {};
    for (const configName of names) {
      for (const configResult of rows) {
        if (configResult.key === configName) {
          result[configName] = configResult.value;
          break;
        }
      }
    }

    return result;
  }
}
