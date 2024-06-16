import { query } from "../../lib/db"

export default async function handler(req, res) {

    if (req.method == "POST") {
        try {
            const { name } = req.body
            const phone = await query({
                query: "SELECT PHONE FROM USERS WHERE NAME=?",
                values: [name]
            })
            res.status(200).json(phone);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message});
        }
    }
}
