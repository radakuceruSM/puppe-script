const Mongoose = require("mongoose");

class MongoDb {
  constructor(uri) {
    this.uri = uri;
    this.client = null;
  }

  async connect() {
    try {
      console.log(`MongoDb: Connecting to database ${this.uri}...`);

      if (this.client) {
        console.log("MongoDb: Using cached database instance...");
        return this.client;
      }

      this.client = await Mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("MongoDb: Database connected sucessfully.");

      return this.client;
    } catch (err) {
      console.log("MongoDb: Connecting to database failed.");
      throw err;
    }
  }

  model(name, schema, collection) {
    if (this.client.models[name]) {
      return this.client.models[name];
    }
    return this.client.model(name, schema, collection);
  }

  async disconnect() {
    try {
      await this.client.disconnect();
      console.log("MongoDb: Database disconnected.");

      this.client = null;

      return true;
    } catch (err) {
      console.log("MongoDb: Database disconnection failed.");
      throw err;
    }
  }
}

module.exports = MongoDb;
