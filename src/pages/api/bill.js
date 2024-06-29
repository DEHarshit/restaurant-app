// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
export default async function handler(req, res) {

    if (req.method == "GET") {
        
        res.status(200).json({ revenue });
    } else if (req.method == "POST") {
        try {
            const { id, user, phone, price } = req.body;


            await query({
                query: "INSERT INTO BILLS (USERID,TOTAL_AMOUNT,OID,PHONE,GEN_DATE) VALUES (?,?,?,?,SYSDATE())",
                values: [user,price,id,phone]
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
                query: "SELECT * FROM ORDETAILS WHERE OID=?",
                values: [id]
            })

            res.status(200).json({ order, ordetails });
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
                query: "SELECT * FROM ORDETAILS WHERE OID=?",
                values: [id]
            })

            res.status(200).json({ order, ordetails });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    }
}
