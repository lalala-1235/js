async function init() {
const sheet = require('./getSheet');
let result = await sheet('1LYyhpqHlc8IUNEgCxnjBmJEWfJIG3qzn-QAKry8FYJE', null);
result = result["table"].rows.slice(1)
let DB = Array();
for (let i=0;i<result.length;i++) {
    let Q = result[i]["c"][0]["v"];
    let A = result[i]["c"][1]["v"]
    DB.push(`${Q}: ${A}`)
    }
    console.log(DB);
}