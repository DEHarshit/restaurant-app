// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
export default async function handler(req, res) {

    if (req.method == "GET") {
        const ingredients = await query({
            query: "SELECT * FROM INGREDIENTS ORDER BY NAME                                                                                                                                                                  ",
            values: []
        })
        res.status(200).json({ ingredients });
    } else if (req.method == "PUT") {
        try {
            const { id, name, type, uom } = req.body;
            const addIng = await query({
                query: "UPDATE INGREDIENTS SET NAME=?,TYPE=?,UOM=? WHERE ID=?",
                values: [name, type, uom, id]
            })
            const ingredients = await query({
                query: "SELECT * FROM INGREDIENTS ORDER BY NAME                                                                                                                                                                  ",
                values: []
            })
            res.status(200).json({ ingredients });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if (req.method == "POST") {
        try {
            const { name, type, uom } = req.body;
            const addIng = await query({
                query: "INSERT INTO INGREDIENTS (NAME,TYPE,UOM) VALUES (?,?,?)",
                values: [name, type, uom]
            })
            const ingredients = await query({
                query: "SELECT * FROM INGREDIENTS ORDER BY NAME                                                                                                                                                                  ",
                values: []
            })
            res.status(200).json({ ingredients });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if ( req.method == "DELETE") {
        try{
            const {select} = req.body;
            for (const id of select){
                await query({
                    query: "DELETE FROM INGREDIENTS WHERE ID = ?",
                    values: [id]
                });
            }
            const ingredients = await query({
                query: "SELECT * FROM INGREDIENTS ORDER BY NAME                                                                                                                                                                  ",
                values: []
            })
            res.status(200).json({ ingredients });
        } catch (error) {
            res.status(500).json({ success:false, error: error.message });
        }
    }
}
