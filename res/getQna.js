const fs = require("fs");
module.exports = {
  run: async function init() {
    const sheet = require("./getSheet");
    let result = await sheet(
      "1LYyhpqHlc8IUNEgCxnjBmJEWfJIG3qzn-QAKry8FYJE",
      null
    );
    result = result["table"].rows.slice(1);
    let DB = {};
    for (let i = 0; i < result.length; i++) {
      let Q = result[i]["c"][0]["v"];
      let A = result[i]["c"][1]["v"];
      DB[Q] = A;
    }

    return JSON.stringify(DB);
  },
};
//이건 구글 시트에서 대화 불러오는 코드222222222222
