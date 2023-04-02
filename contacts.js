const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

async function getContactById(id) {
  const contactsList = await listContacts();
  const contactById = contactsList.find( contact => contact.id === id);
  return contactById || null;
};

async function removeContact(id) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  };
  const [result] = contactsList.splice(index, 1);
  await  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return result;
};

async function addContact(data) {
  const contactsList = await listContacts();
  const newContact = { 
    ...data, 
    id: nanoid(10), 
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2),'utf8');
  return newContact;
};

async function updateById(id, data) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  };
  contactsList[index] = {id, ...data};
  await  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList[index];
}

module.exports = { 
  listContacts, 
  getContactById, 
  removeContact, 
  addContact, 
  updateById,
};