const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

// console.log(`contactsPath: ${contactsPath}`);


async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactsList = JSON.parse(data);
  return(contactsList);
};

async function getContactById(contactId) {
  const contactsList = await listContacts();
  console.log("SEARCHING RESULT:");

  const contactById = contactsList.find( (contact) => contact.id === contactId);

  if(!contactById) { 
    console.log(`There is no contact with id: ${contactId}`);
    return;
  };
  console.log(`We found a contact with id: ${contactId}: `, contactById);
  return contactById;
};

function updateContactList(newList) {
  return fs.writeFile(contactsPath, JSON.stringify(newList),'utf8');
};

async function removeContact(contactId) {
  const contactsList = await listContacts();

  const contactById = contactsList.find( (contact) => contact.id === contactId);
  if (!contactById){
    console.log(`There is no contact with id: ${contactId}`);
    return;
  }
  
  const filteredContactsList = contactsList.filter( (contact) => 
    contact.id !== contactId);
  
  await updateContactList(filteredContactsList);
  console.log('Your new contact list: ', filteredContactsList);
  return filteredContactsList;
};

async function addContact(name, email, phone) {
  if (!name || ! email || !phone) {
    console.log(`Please, enter: name, email, phone.`);
    return;
  };

  const newContact = { 
    id: nanoid(10),
    name,
    email,
    phone
  };

  const contactsList = await listContacts();
  contactsList.push(newContact);

  await updateContactList(contactsList);
  console.log(newContact);

  return newContact;
};

module.exports = { 
  listContacts, 
  getContactById, 
  removeContact, 
  addContact, 
};