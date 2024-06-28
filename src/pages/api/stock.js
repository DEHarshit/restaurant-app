// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
export default async function handler(req, res) {

    if (req.method == "GET") {
        const stock = await query({
            query: "SELECT * FROM STOCK",
            values: []
        })
        res.status(200).json({ stock });
    } else if (req.method == "PUT") {
        try {
            const { id, ing, qty, exp} = req.body;

            await query({
                query:"UPDATE STOCK SET INAME=?,QTY=?,EXP_DATE=? WHERE ID=?",
                values:[ing,qty,exp,id]
            })
            
            const stock = await query({
                query: "SELECT * FROM STOCK",
                values: []
            })

            res.status(200).json({ stock });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if (req.method == "POST") {
        try {

            const { ing, qty, exp} = req.body;

            await query({
                query:"INSERT INTO STOCK (INAME,QTY,SUPPLIED_DATE,EXP_DATE) VALUES (?,?,SYSDATE(),?)",
                values:[ing,qty,exp]
            })
            
            const stock = await query({
                query: "SELECT * FROM STOCK",
                values: []
            })
            res.status(200).json({ stock });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if ( req.method == "DELETE") {
        try{
            const {select} = req.body;
            for (const id of select){
                await query({
                    query: "DELETE FROM STOCK WHERE ID = ?",
                    values: [id]
                });
            }
            const stock = await query({
                query: "SELECT * FROM STOCK",
                values: []
            })
            res.status(200).json({ stock });
        } catch (error) {
            res.status(500).json({ success:false, error: error.message });
        }
    }
}
