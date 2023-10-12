const fs = require("fs").promises;
const path = require("path");
const randomId = require("crypto").randomUUID;

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath));
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const res = contacts.find(({ id }) => id === contactId);

    return res || null;
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(({ id }) => id === contactId);

    if (idx !== -1) {
      const resArr = contacts.splice(idx, 1);
      fs.writeFile(contactsPath, JSON.stringify(contacts));
      return resArr[0];
    }
    return null;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: randomId(), name, email, phone };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

const contacts = { listContacts, getContactById, addContact, removeContact };

module.exports = contacts;