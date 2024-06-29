// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/pages/local/buffer.json');

export default async function handler(req, res) {

    if (req.method == "GET") {

        const { id } = req.body;

        const recipes = await query({
            query: "SELECT DID,INAME,QTY,UOM FROM RECIPES R,INGREDIENTS I WHERE I.NAME=R.INAME ORDER BY DID",
            values: [id || 1]
        })

        const srecipes = await query({
            query: "SELECT DID,INAME,QTY,UOM FROM RECIPES R,INGREDIENTS I,DISHES D WHERE I.NAME=R.INAME AND D.ID = R.DID AND ISPRE=0 ORDER BY DID",
            values: [id || 1]
        })

        const rcount = await query({
            query: "SELECT DID, COUNT(DID) AS COUNT FROM RECIPES R,DISHES D WHERE D.ID = R.DID AND ISPRE=0 GROUP BY DID",
            values: []
        })

        res.status(200).json({ recipes, rcount,srecipes });
    } if (req.method == "PUT") {

        const { id } = req.body;

        const recipes = await query({
            query: "SELECT DID,INAME,QTY,UOM FROM RECIPES R,INGREDIENTS I WHERE I.NAME=R.INAME AND DID =? ORDER BY DID",
            values: [id]
        })

        res.status(200).json({ recipes });
    } if (req.method == "POST") {

        const { id } = req.body;

        const recipes = await query({
            query: "SELECT DID,INAME,QTY,UOM FROM DISHES D,RECIPES R,INGREDIENTS I WHERE I.NAME=R.INAME AND D.ID=R.DID AND D.NAME=? ORDER BY DID",
            values: [id]
        })

        res.status(200).json({ recipes });
    }

}
