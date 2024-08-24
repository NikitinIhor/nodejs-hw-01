import { PATH_DB } from "../constants/contacts.js";
import { getAllContacts } from "./getAllContacts.js";
import * as fs from "node:fs/promises";


export const removeLastContact = async () => {
    const allContacts = await getAllContacts();
    if (allContacts.length === 0) return;

    allContacts.pop();

    await fs.writeFile(PATH_DB, JSON.stringify(allContacts, null, 2));

};


removeLastContact();