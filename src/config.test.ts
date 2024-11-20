import { Mysql } from "@pefish/js-helper-mysql";
import Config from "./config";

describe("test config", () => {
  it("fetchConfigsFromDb", async function () {
    const mysqlInstance = await Mysql.new(global.logger, {
      host: "",
      username: "pefish_me",
      password: "",
      database: "pefish_me",
    });
    const result = await Config.fetchConfigsFromDb(mysqlInstance, [
      "trade_amount",
    ]);
    console.log(result);
  });
});
