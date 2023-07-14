const path = require("path");

const { v1: uuidv1 } = require("uuid");

const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
    const response = await fs.readFile(contactsPath);
    return JSON.parse(response.toString()) || null;
}

async function getContactById(contactId) {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response.toString());
    const foundedContact = contacts.filter(
      (contact) => contact.id === contactId
    );
    if (foundedContact.length >= 1) {
      return foundedContact;
    } else {
      return null;
    }
}

async function removeContact(contactId) {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response.toString());
    const remainedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    if (contacts.length !== remainedContacts.length) {
      doDelete(remainedContacts);
      return contacts.filter((contact) => contact.id === contactId) || null;
    } else {
      return null;
    }
}

function doDelete(remainedContacts) {
    fs.writeFile(contactsPath, JSON.stringify(remainedContacts, null, 2));
}

async function addContact(name, email, phone) {
  const id = uuidv1();
  const newContact = { id, name, email, phone };

    const response = await fs.readFile(contactsPath);
    const allContacts = JSON.parse(response.toString());
    return doWrite(newContact, allContacts);
}

function doWrite(newContact, allContacts) {
  allContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact || null;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
