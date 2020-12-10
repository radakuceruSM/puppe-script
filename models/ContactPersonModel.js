const { Schema } = require("mongoose");

const ContactPersonModel = new Schema({
  id: String,
  name: String,
  phone: String,
  type: String,
  email: String
});

module.exports = ContactPersonModel;
