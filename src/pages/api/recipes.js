// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/pages/local/buffer.json');

export default async function handler(req, res) {

    if (req.method == "GET") {
        
        const { id } = req.body;

        const recipes = await query({
            query: "SELECT DID,INAME,QTY,UOM FROM RECIPES R,INGREDIENTS I WHERE I.NAME=R.INAME",
            values: [id || 1]
        })
        res.status(200).json({ recipes });
    }

}
