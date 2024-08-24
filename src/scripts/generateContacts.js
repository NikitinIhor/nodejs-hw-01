import * as fs from "node:fs/promises";
import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from "../utils/createFakeContact.js";
import { getAllContacts } from "./getAllContacts.js";

const generateContacts = async (number) => {
    const contactList = Array(number).fill(0).map(createFakeContact);
    const newContactList = await getAllContacts();
    contactList.push(...newContactList);
    await fs.writeFile(PATH_DB, JSON.stringify(contactList, null, 2));
};

generateContacts(5);