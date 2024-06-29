// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
export default async function handler(req, res) {

    if (req.method == "GET") {

        const lstock = await query({
            query: "SELECT INAME FROM TOTAL_STOCK WHERE QTY < 900 AND QTY != 0",
            values: []
        })

        const ostock = await query({
            query: "SELECT INAME FROM TOTAL_STOCK WHERE QTY=0",
            values: []
        })

        const meatIngredients = await query({
            query: "SELECT NAME FROM INGREDIENTS WHERE TYPE='Meat'",
            values: []
        })

        const vegetableIngredients = await query({
            query: "SELECT NAME FROM INGREDIENTS WHERE TYPE='Vegetables'",
            values: []
        })

        const expiry = await query({
            query: "SELECT INAME,EXP_DATE,SID FROM STOCK WHERE EXP_DATE IS NOT NULL AND EXP_DATE<SYSDATE()+ INTERVAL 2 DAY",
            values: []
        })

        res.status(200).json({ lstock, ostock, meatIngredients, vegetableIngredients, expiry });
    } else if (req.method == "PUT") {
        try {

            res.status(200).json({ stock, mstock, vstock, gstock, cstock });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if (req.method == "POST") {
        try {

            res.status(200).json({ stock, mstock, vstock, gstock, cstock });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } else if (req.method == "DELETE") {
        try {

            res.status(200).json({ stock, mstock, vstock, gstock, cstock });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}
