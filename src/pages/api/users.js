import { query } from "../../lib/db"

import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/pages/local/userbuffer.json');

export default async function handler(req, res) {

    if (req.method == "GET") {
        
        const users = await query({
            query: "SELECT * FROM USERS",
            values: []
        })

        const neworder = await query({
            query: "SELECT MAX(ID)+1 MAX FROM ORDERS",
            values: []
        })

        res.status(200).json({ users, neworder });
    } else if (req.method == "PUT") {
        try {
            const { index } = req.body;
            const jsonData = await fsPromises.readFile(filePath);
            const objectData = JSON.parse(jsonData);

            const user = objectData[index];

            await query({
                query: "INSERT INTO USERS (ID,NAME,PASSWORD,PREVPASS,ROLE,EMAIL,PHONE) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE NAME=VALUES(NAME),PASSWORD=VALUES(PASSWORD),PREVPASS=VALUES(PREVPASS),ROLE=VALUES(ROLE),EMAIL=VALUES(EMAIL),PHONE=VALUES(PHONE)",
                values: [user.id, user.name, user.password, user.prevpass, user.role, user.email, user.phone]
            })

            res.status(200).json({ success: true });
        } catch (error) {

            res.status(500).json({ success: false, error: error.message, objectData });
        }
    } else if (req.method == "POST") {
        try {
            const { name, password, email, phone } = req.body;
            const addUser = await query({
                query: "INSERT INTO USERS (NAME,PASSWORD,PREVPASS,ROLE,EMAIL,PHONE) VALUES (?,?,?,?,?,?)",
                values: [name, password, password, "Customer", email, phone]
            })

            const jsonData = await fsPromises.readFile(filePath);
            const objectData = JSON.parse(jsonData);

            const newData = {
                id: objectData.length + 1,
                name: name,
                password: password,
                prevpass: password,
                role: "Customer",
                email: email,
                phone: phone
            }

            objectData.push(newData);

            const updatedData = JSON.stringify(objectData);

            await fsPromises.writeFile(filePath, updatedData);

            res.status(200).json({ success: true });
        } catch (error) {

            res.status(500).json({ success: false, error: error.message });
        }
    }
}
