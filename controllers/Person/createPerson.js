const MongoDb = require("../../databases/MongoDb");
const ContactPersonModel = require("../../models/ContactPersonModel");

const createPerson = async (person) => {
  const MONGO_URI = "mongodb+srv://Radek:VseGiG67HMSGtznQ@cluster0.ul88g.mongodb.net/ghost?retryWrites=true&w=majority";

  const mongo = new MongoDb(MONGO_URI);

  await mongo.connect();

  const newPerson = {
    id: person["ID"],
    name: person["Jméno"],
    phone: person["Typ"] === "Neuvedeno" ? person["Typ"] : null,
    type: person["E-mail"],
    email: person["Telefon"]
  };

  const Person = mongo.model("Person", ContactPersonModel, "contact_persons");

  await Person.findOneAndUpdate({ id: newPerson.id }, newPerson, { upsert: true });

  await mongo.disconnect();
};

module.exports = createPerson;
