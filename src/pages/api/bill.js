// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
export default async function handler(req, res) {

    if (req.method == "GET") {
        const bills = await query({
            query: "SELECT * FROM BILLS",
            values: []
        })
        res.status(200).json({ bills });
    } else if (req.method == "POST") {
        try {
            const { id, user, phone, price, name } = req.body;


            await query({
                query: "INSERT INTO BILLS (USERID,TOTAL_AMOUNT,OID,PHONE,GEN_DATE,NAME) VALUES (?,?,?,?,NOW(),?)",
                values: [user,price,id,phone,name]
            })

            await query({
                query: "UPDATE ORDERS SET PSTATUS='Paid' WHERE ID=?",
                values: [id]
            })

            const order = await query({
                query: "SELECT * FROM ORDERS WHERE ID=?",
                values: [id]
            })

            const ordetails = await query({
                query: "SELECT OID,DNAME,SUM(QTY) QTY,SUM(PRICE) PRICE FROM ORDETAILS WHERE OID=? GROUP BY OID,DNAME",
                values: [id]
            })

            const neworder = await query({
                query: "SELECT MAX(ID)+1 MAX FROM ORDERS",
                values: []
            })
    

            res.status(200).json({ order, ordetails, neworder });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if (req.method == "DELETE") {
        try {

            res.status(200).json({ orders });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if (req.method == "PUT") {
        try {
            const { id } = req.body;

            const order = await query({
                query: "SELECT * FROM ORDERS WHERE ID=?",
                values: [id]
            })

            const ordetails = await query({
                query: "SELECT OID,DNAME,SUM(QTY) QTY,SUM(PRICE) PRICE FROM ORDETAILS WHERE OID=? GROUP BY OID,DNAME",
                values: [id]
            })

            res.status(200).json({ order, ordetails });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    }
}
