const puppeteer = require("puppeteer");
const fs = require("fs");
const createPerson = require("./controllers/Person/createPerson");
const createSchool = require("./controllers/School/createSchool");

const URL = "https://ghost.scg.cz/schools/schools";

(async () => {
  const browser = await puppeteer.launch({
    args: ["--enable-features=NetworkService", "--ignore-certificate-errors", "--disable-web-security"],
    ignoreHTTPSErrors: true,
    headless: false,
    userDataDir: "./bin"
  });

  const page = await browser.newPage();

  // Zakomentuj to pod tímhle a přihlaš se předtím, než to spustíš.

  for (let i = 1; i < 10750; i++) {
    let response = await page.goto(`${URL}/${i}`);

    console.log(response.status());

    if (response.status() === 200) {
      let { school, contacts } = await page.evaluate(() => {
        const wrapper = document.getElementsByClassName("content")[0];

        const [details, contacts] = wrapper.getElementsByClassName("col-md-6");

        const keys = details.getElementsByTagName("th");
        const values = details.getElementsByTagName("td");

        const school = {};
        const contactPeople = [];

        for (let i = 0; i < keys.length; i++) {
          school[keys[i].innerText] = values[i].innerText;
        }

        const people = contacts.getElementsByTagName("tr");
        const tags = contacts.getElementsByTagName("th");

        for (let i = 1; i < people.length; i++) {
          const row = people[i];

          const person = {};

          const items = row.getElementsByTagName("td");

          for (let i = 0; i < items.length; i++) {
            person[tags[i].innerText] = items[i].innerText;
          }

          contactPeople.push(person);
        }

        school.contacts = contactPeople.map((person) => person["ID"]);

        return { school, contacts: contactPeople };
      });

      for (let person of contacts) {
        await createPerson(person);
      }

      await createSchool(school);
    }
  }

  await browser.close();
})();
