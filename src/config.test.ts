import SequelizeHelper from "@pefish/js-helper-mysql";
import Config from "./config";

describe("test config", () => {
  it("fetchConfigsFromDb", async function () {
    const mysqlInstance = new SequelizeHelper(
      {
        host: "",
        username: "pefish_me",
        password: "",
        database: "pefish_me",
      },
      global.logger
    );
    await mysqlInstance.init();
    const result = await Config.fetchConfigsFromDb(mysqlInstance, [
      "trade_amount",
    ]);
    console.log(result);
  });
});
