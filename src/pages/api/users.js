import { query } from "../../lib/db"

export default async function handler(req, res) {

    if (req.method == "GET") {
        const users = await query({
            query: "SELECT * FROM USERS",
            values: []
        })
        res.status(200).json({ users });
    } else if (req.method == "POST") {
        try {
            const { name, password, email, phone } = req.body;
            const addUser = await query({
                query: "INSERT INTO USERS (NAME,PASSWORD,PREVPASS,ROLE,EMAIL,PHONE) VALUES (?,?,?,?,?,?)",
                values: [name, password, password, "customer", email, phone]
            })
            res.status(200).json({ success: true });
        } catch (error) {

            res.status(500).json({ success: false, error: error.message });
        }
    }
}
