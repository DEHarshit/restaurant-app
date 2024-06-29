// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
export default async function handler(req, res) {
    if (req.method == "PUT") {
        try {
            const { stock } = req.body;

            if(Array.isArray(stock)){
                for (let i = 0; i < stock.length; i++) {
                    const id = stock[i].ID;
                    const qty = stock[i].QTY;
                    await query({
                        query: "UPDATE STOCK SET QTY=? WHERE ID=?",
                        values: [qty,id]
                    });
                }
            }

            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    }
}
