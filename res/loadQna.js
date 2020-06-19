const { initDB, createModel } = require("./db");
const { filterFormats } = require("ytdl-core");
//import { mongoose as db } from 'mongoose';

const uri =
  "mongodb+srv://<id>:<pwd>@cluster0-lzset.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
const sampleSchema = {
  q: String,
  a: String,
};

const errorOnDB = (e) => {
  console.log(e);
};

initDB(uri, "qna", { id: "tester", pwd: "test1234" }).catch((e) => {
  console.log(e);

  process.exit(0);
});

let Sample = createModel("sample", sampleSchema);

module.exports = {
  get: async (args) => {
    // find a document
    let docs = await Sample.find({ q: args }).lean(true).catch(errorOnDB);
    console.log("success to find");
    if (!docs[0]) return null;
    docs = JSON.parse(JSON.stringify(docs).replace("[", "").replace("]", "")).a;

    return docs;
  },
  learn: async (question, answer, message) => {
    let sampleFormat = {
      q: question,
      a: answer,
    };

    let findExist = await Sample.find({ q: question });

    if (findExist.length == 0) {
      await Sample.create(sampleFormat).catch(errorOnDB);
      console.log("success to insert");
      message.channel.send(`이제 ${question}은 ${answer}이에요!`);
    } else {
      return message.channel.send("이미 알고 있는 말이에요!");
    }
  },
  update: async (question, answer, message) => {
    let findExist = await Sample.find({ q: question });
    if (findExist.length == 0) {
      return message.channel.send("그런 말은 몰라요!");
    } else {
      await Sample.updateOne({ q: { $eq: question } }, { a: answer }).catch(
        errorOnDB
      );
      return message.channel.send(`이제 ${question}은 ${answer}이에요!`);
    }
  },
  delete: async (question, message) => {
    let findExist = await Sample.find({ q: question });
    if (findExist.length == 0) {
      return message.channel.send("그런 말은 몰라요!");
    } else {
      await Sample.deleteOne({ q: question }).catch(errorOnDB);
      return message.channel.send(`이제 더이상 ${question}을 기억하지 못해요!`);
    }
  },
};
