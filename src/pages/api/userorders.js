// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"


export default async function handler(req, res) {


    if (req.method == "POST") {
        const {name} = req.body
        const orders = await query({
            query: "SELECT * FROM ORDERS WHERE NAME = ? ORDER BY DATE",
            values: [name]
        })
        const ordetails = await query({
            query: "SELECT * FROM ORDETAILS",
            values: []
        })
        res.status(200).json({ orders, ordetails });
    }
    else if (req.method == "DELETE") {
        try {

            const { id,name } = req.body;

            await query({
                query: "DELETE FROM ORDERS WHERE ID=?",
                values: [id]
            })

            const orders = await query({
                query: "SELECT * FROM ORDERS WHERE NAME = ? ORDER BY DATE",
                values: [name]
            })
            const ordetails = await query({
                query: "SELECT * FROM ORDETAILS",
                values: []
            })


            res.status(200).json({ orders, ordetails });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if (req.method == "PUT") {
        try {


            res.status(200).json({ orders });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    }
}
