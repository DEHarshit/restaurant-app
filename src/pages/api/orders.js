// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
export default async function handler(req, res) {

    if (req.method == "GET") {
        const orders = await query({
            query: "SELECT * FROM ORDERS ORDER BY DATE",
            values: []
        })
        const ordetails = await query({
            query: "SELECT * FROM ORDETAILS",
            values: []
        })

        res.status(200).json({ orders, ordetails });
    } else if (req.method == "POST") {
        try {
            const { id, name, cart, qty, phone, price } = req.body;

            const existingOrder = await query({
                query: "SELECT ID FROM ORDERS WHERE ID = ?",
                values: [id]
            });

            if (existingOrder.length > 0) {
                
                for (let i = 0; i < cart.length; i++) {
                    await query({
                        query: "INSERT INTO ORDETAILS (OID,DNAME,QTY,PRICE) VALUES (?,?,?,?)",
                        values: [id, cart[i], qty[i], price[i]]

                    })
                }
                const rest = await query({
                    query: "SELECT SUM(PRICE) AS PRICE FROM ORDETAILS WHERE OID=?",
                    values: [id]
                });

                const total = rest[0]?.PRICE;

                await query({
                    query: "UPDATE ORDERS SET PRICE=? WHERE ID=?",
                    values: [total, id]
                })

            } else {
                await query({
                    query: "INSERT INTO ORDERS (ID,NAME,ORDPHONE,STATUS,DATE,PSTATUS) VALUES (?,?,?,?,NOW(),'Not Paid')",
                    values: [id, name, phone, 'Pending']
                })

                for (let i = 0; i < cart.length; i++) {
                    await query({
                        query: "INSERT INTO ORDETAILS (OID,DNAME,QTY,PRICE) VALUES (?,?,?,?)",
                        values: [id, cart[i], qty[i], price[i]]

                    })
                }

                const rest = await query({
                    query: "SELECT SUM(PRICE) AS PRICE FROM ORDETAILS WHERE OID=?",
                    values: [id]
                });

                const total = rest[0]?.PRICE;

                await query({
                    query: "UPDATE ORDERS SET PRICE=? WHERE ID=?",
                    values: [total, id]
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
                query: "SELECT * FROM ORDERS ORDER BY DATE",
                values: []
            })



            res.status(200).json({ orders });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if (req.method == "PUT") {
        try {
            const { id, status } = req.body;


            if (status === 'Accepted') {
                await query({
                    query: "UPDATE ORDERS SET STATUS = 'Finished' WHERE ID=?",
                    values: [id]
                })
            }

            if (status === 'Pending') {
                await query({
                    query: "UPDATE ORDERS SET STATUS = 'Accepted' WHERE ID=?",
                    values: [id]
                })
            }


            const orders = await query({
                query: "SELECT * FROM ORDERS ORDER BY DATE",
                values: []
            })

            res.status(200).json({ orders });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    }
}
