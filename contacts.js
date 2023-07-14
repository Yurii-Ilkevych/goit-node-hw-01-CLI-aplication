const path = require("path");

const { v1: uuidv1 } = require("uuid");

const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath);
    console.table(JSON.parse(response.toString()));
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response.toString());
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
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response.toString());
    const remainedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    if (contacts.length !== remainedContacts.length) {
      doDelete(remainedContacts);
      console.log(contacts.filter((contact) => contact.id === contactId));
      return;
    } else {
      console.log(null);
      return;
    }
  } catch (error) {
    console.log(error.message);
  }
}

function doDelete(remainedContacts) {
  try {
    fs.writeFile(contactsPath, JSON.stringify(remainedContacts));
  } catch (error) {
    console.log("404");
  }
}

async function addContact(name, email, phone) {
  const id = uuidv1();
  const newContact = { id, name, email, phone };

  try {
    const response = await fs.readFile(contactsPath);
    const allContacts = JSON.parse(response.toString());
    doWrite(newContact, allContacts);
  } catch (error) {
    console.log(error.message);
  }
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
