const { Schema } = require("mongoose");

const SchoolModel = new Schema({
  id: String,
  schoolName: String,
  shortSchoolName: String,
  principalEmail: String,
  email: String,
  izo: String,
  ico: String,
  city: String,
  postCode: String,
  gps: String,
  description: String,
  region: String,
  principalPhone: String,
  phone: String,
  league: String,
  type: String,
  street: String,
  web: String,
  contacts: [String]
});

module.exports = SchoolModel;
