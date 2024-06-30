import { query } from "../../lib/db"

export default async function handler(req, res) {

    if (req.method == "POST") {
        try {
            const { name } = req.body
            const phone = await query({
                query: "SELECT PHONE FROM USERS WHERE NAME=?",
                values: [name]
            })
            const id = await query({
                query: "SELECT ID FROM USERS WHERE NAME=?",
                values: [name]
            })
            const password = await query({
                query: "SELECT PASSWORD FROM USERS WHERE NAME=?",
                values: [name]
            })
            res.status(200).json({ phone, id, password });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else if (req.method == 'PUT') {
        try {
            const { phone, prevpass } = req.body
            const userid = await query({
                query: "SELECT NAME,PASSWORD FROM USERS WHERE PHONE=? AND PREVPASS=?",
                values: [phone, prevpass]
            })
            res.status(200).json({ userid });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else if (req.method == 'DELETE') {
        try {
            const { id, password,prev } = req.body
            await query({
                query:"UPDATE USERS SET PASSWORD=?,PREVPASS=? WHERE NAME=?",
                values:[password,prev,id]
            })

            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}
