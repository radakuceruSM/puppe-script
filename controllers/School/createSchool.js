const MongoDb = require("../../databases/MongoDb");
const SchoolModel = require("../../models/SchoolModel");

const createSchool = async (school) => {
  const MONGO_URI = "mongodb+srv://Radek:VseGiG67HMSGtznQ@cluster0.ul88g.mongodb.net/ghost?retryWrites=true&w=majority";

  const mongo = new MongoDb(MONGO_URI);

  await mongo.connect();

  const newSchool = {
    id: school["ID:"],
    schoolName: school["Jméno školy:"],
    shortSchoolName: school["Krátký název školy:"],
    principalEmail: school["E-mail ředitel:"],
    email: school["E-mail:"],
    izo: school["IZO:"],
    ico: school["IČO:"],
    city: school["Město:"],
    postCode: school["PSČ:"],
    gps: school["Poloha:"],
    description: school["Poznámka:"],
    region: school["Region:"],
    principalPhone: school["Telefon ředitel:"],
    phone: school["Telefon:"],
    league: school["Turnaj:"],
    type: school["Typ:"],
    street: school["Ulice:"],
    web: school["Web:"],
    contacts: school.contacts
  };

  const School = mongo.model("School", SchoolModel, "schools");

  await School.findOneAndUpdate({ id: newSchool.id }, newSchool, { upsert: true });

  await mongo.disconnect();
};

module.exports = createSchool;
