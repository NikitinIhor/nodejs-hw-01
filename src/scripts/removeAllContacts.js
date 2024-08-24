import { PATH_DB } from "../constants/contacts.js";
import { getAllContacts } from "./getAllContacts.js";
import * as fs from "node:fs/promises";

export const removeAllContacts = async () => {
    const allContacts = await getAllContacts();

    if (allContacts.length === 0) return;

    await fs.writeFile(PATH_DB, JSON.stringify([], null, 2));
};

removeAllContacts();