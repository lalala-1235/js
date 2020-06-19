const mongoose = require("mongoose");

// mongodb 연결에 필요한 초기 파라미터들
const dbParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  // autoIndex: false, // Don't build indexes
  // autoReconnect: true,
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 5000, // Reconnect every 500ms
  // If not connected, return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0,
  // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4, // Use IPv4, skip trying IPv6
  //promiseLibrary: global.Promise,
};

module.exports = {
  initDB: async function (uri, dbname, auth) {
    if (!uri || !dbname || !auth) throw new Error("plz check parameters");

    let fullURI = uri
      .replace(/\<id\>/, auth.id)
      .replace(/\<pwd\>/, auth.pwd)
      .replace(/\<dbname\>/, dbname);

    console.log(`db url : ${fullURI}`);

    if (mongoose.connection.readyState != 1) {
      // disconnected
      await mongoose
        .connect(fullURI, {
          ...dbParams,
          // ...auth
        })
        .catch((e) => {
          throw e;
        });

      console.log("success to connect DB");
      return mongoose.connection;
    }

    throw new Error("already connected");
  },
  createModel: function (name, schema) {
    let aModel = new mongoose.Schema(schema);

    return mongoose.model(name, aModel);
  },
};
