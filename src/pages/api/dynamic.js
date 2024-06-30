// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
export default async function handler(req, res) {

    if (req.method == "GET") {
        
        const stock = await query({
            query:"SELECT * FROM TOTAL_STOCK",
            values:[]
        })

        const ustock = await query({
            query:"SELECT T.INAME INAME,T.QTY QTY,I.UOM FROM TOTAL_STOCK T LEFT JOIN INGREDIENTS I ON I.NAME=T.INAME",
            values:[]
        })

        const ingredients = await query({
            query:"SELECT NAME FROM INGREDIENTS",
            values:[]
        })

        const predish = await query({
            query:"SELECT ID FROM DISHES WHERE ISPRE=1",
            values:[]
        })

        res.status(200).json({ stock, ingredients, predish,ustock });
    } else if (req.method == "POST") {
        try {
            const { id, count } = req.body;

            const acount = await query({
                query:"SELECT COUNT FROM DISHES WHERE ID = ?",
                values:[id]
            })

            await query({
                query:"UPDATE DISHES SET COUNT = ? WHERE ID = ?",
                values:[acount[0].COUNT-count,id]
            })

            const dishes = await query({
                query: "SELECT D.ID,D.NAME,DESCRIPTION,IMAGE,SPECIAL,PRICE,ISVEG,D.TYPE,ISPRE,COUNT FROM DISHES D",
                values: []
            })
            
            res.status(200).json({ dishes });

            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if (req.method == "DELETE") {
        try {
            
            
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if (req.method == "PUT") {
        try {
            const { id, count } = req.body;

            await query({
                query:"UPDATE DISHES SET COUNT = ? WHERE ID = ?",
                values:[count,id]
            })

            const dishes = await query({
                query: "SELECT D.ID,D.NAME,DESCRIPTION,IMAGE,SPECIAL,PRICE,ISVEG,D.TYPE,ISPRE,COUNT FROM DISHES D",
                values: []
            })
            
            res.status(200).json({ dishes });

        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } 
}
