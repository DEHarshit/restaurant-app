// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
export default async function handler(req, res) {

    if (req.method == "GET") {
        const orders = await query({
            query: "SELECT * FROM ORDERS",
            values: []
        })
        const ordetails = await query({
            query: "SELECT * FROM ORDETAILS",
            values: []
        })
        res.status(200).json({ orders,ordetails });
    } else if (req.method == "POST") {
        try {
            const { name, cart, qty, phone } = req.body;

            await query({
                query: "INSERT INTO ORDERS (NAME,ORDPHONE,STATUS,DATE) VALUES (?,?,?,NOW())",
                values: [name, phone, 'Pending']
            })

            const result = await query({
                query: "SELECT ID FROM ORDERS ORDER BY ID DESC LIMIT 1"
            })

            const id = result[0]?.ID;

            for (let i = 0; i < cart.length; i++) {
                await query({
                    query: "INSERT INTO ORDETAILS (OID,DNAME,QTY) VALUES (?,?,?)",
                    values: [id,cart[i],qty[i]]

                })
            }

            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if (req.method == "DELETE") {
        try {
            
            const { id } = req.body;

            await query({
                query: "UPDATE ORDERS SET STATUS = 'Cancelled' WHERE ID=?",
                values: [id]
            })

            const orders = await query({
                query: "SELECT * FROM ORDERS",
                values: []
            })

            res.status(200).json({ orders });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if (req.method == "PUT") {
        try {
            const { id,status } = req.body;

            
            if (status === 'Accepted'){
                await query({
                    query: "UPDATE ORDERS SET STATUS = 'Finished' WHERE ID=?",
                    values: [id]
                })
            }

            if (status === 'Pending'){
                await query({
                    query: "UPDATE ORDERS SET STATUS = 'Accepted' WHERE ID=?",
                    values: [id]
                })
            }


            const orders = await query({
                query: "SELECT * FROM ORDERS",
                values: []
            })

            res.status(200).json({ orders });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } 
}
