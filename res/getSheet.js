const http = require("https");

module.exports = (key, query = null) =>
  new Promise((res, rej) => {
    var options = {
      host: "docs.google.com",
      path: `/spreadsheets/d/${key}/gviz/tq?`,
    };
    if (query) options.path += `tq=${query}&`;
    if (options.path.slice(-1) == "&") options.path = options.path.slice(0, -1);

    http
      .request(options, (response) => {
        var str = "";
        response.on("data", function (chunk) {
          str += chunk;
        });

        response.on("end", function () {
          res(JSON.parse(str.slice(47, -2)));
        });
      })
      .end();
  });

//이건 구글 시트에서 대화 불러오는 코드
