const actions  = require("./contacts");

const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await actions.listContacts();
      return console.log(allContacts);

    case "get":
      const contactById = await actions.getContactById(id);
      return console.log(contactById);
    
    case "add":
      const newContact = await actions.addContact({name, email, phone});
      return console.log(newContact);

    case "remove":
      const removedContact = await actions.removeContact(id);
      return console.log(removedContact);

    case "update":
      const updateContact = await actions.updateById(id, {name, email, phone});
      return console.log(updateContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);