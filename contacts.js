const path = require("path");

const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      console.table(JSON.parse(data.toString()));
      return;
    })
    .catch((error) => console.log(console.log("404")));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const foundedContact = contacts.filter(
        (contact) => contact.id === contactId
      );
      if (foundedContact.length >= 1) {
        console.log(foundedContact);
        return;
      } else {
        console.log(null);
        return;
      }
    })
    .catch((error) => console.log(console.log("404")));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const remainedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      if (contacts.length !== remainedContacts.length) {
        deletedContact = contacts.filter((contact) => contact.id === contactId);

        doDelete(remainedContacts);
        console.log(contacts.filter((contact) => contact.id === contactId));
        return;
      } else {
        console.log(null);
        return;
      }
    })
    .catch((error) => console.log("404"));
}

function doDelete(remainedContacts) {
  try {
    fs.writeFile(contactsPath, JSON.stringify(remainedContacts));
  } catch (error) {
    console.log("404");
  }
}

function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const newContact = { name, email, phone };

  fs.readFile(contactsPath)
    .then((data) => {
      const allContacts = JSON.parse(data.toString());

      doWrite(newContact, allContacts);
      return;
    })
    .catch((error) => console.log(console.log("404")));
}

function doWrite(newContact, allContacts) {
  allContacts.push(newContact);

  try {
    fs.writeFile(contactsPath, JSON.stringify(allContacts));
    console.log(newContact);
  } catch (error) {
    console.log("404");
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
