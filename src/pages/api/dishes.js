// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/pages/local/buffer.json');

export default async function handler(req, res) {

    if (req.method == "GET") {
        const dishes = await query({
            query: "SELECT D.ID,D.NAME,DESCRIPTION,IMAGE,SPECIAL,PRICE,ISVEG,D.TYPE FROM DISHES D",
            values: []
        })
        res.status(200).json({ dishes });
    }

    if (req.method == "POST") {
        try {
            const jsonData = await fsPromises.readFile(filePath);
            const objectData = JSON.parse(jsonData);

            for (const dish of objectData) {
                const addDish = await query({
                    query: "INSERT INTO DISHES (ID,IMAGE,NAME,DESCRIPTION,PRICE,SPECIAL,ISVEG) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE IMAGE=VALUES(IMAGE),NAME=VALUES(NAME),DESCRIPTION=VALUES(DESCRIPTION),PRICE=VALUES(PRICE),SPECIAL=VALUES(SPECIAL),ISVEG=VALUES(ISVEG)",
                    values: [dish.id, dish.image || '/placeholder.png', dish.name || '', '', dish.price, false,  dish.isveg]
                })
            }
            for (const dish of objectData) {
                let timings =dish.type[0] || ''; 
                if (Array.isArray(dish.type) && dish.type.length >1 ){
                    for (let i = 1; i < dish.type.length; i++){
                        timings = timings.concat(",",dish.type[i]);
                    }
                }
                const addType = await query({
                    query:`UPDATE DISHES SET TYPE =? WHERE ID=?`,
                    values:[timings,dish.id]
                })
            }


            for (const dish of objectData) {
                if (Array.isArray(dish.ing) && Array.isArray(dish.qty) && dish.ing.length === dish.qty.length) {
                    await query({
                        query: "DELETE FROM RECIPES WHERE DID = ?",
                        values: [dish.id]
                    });

                    for (let i = 0; i < dish.ing.length; i++) {
                        const ing = dish.ing[i];
                        const qty = dish.qty[i];
                        const addIng = await query({
                            query: "INSERT INTO RECIPES (DID, INAME, QTY) VALUES (?, ?, ?)",
                            values: [dish.id, ing || null, qty || null]
                        });
                    }
                } else {
                    console.error("Error: Ingredients or quantities are not properly defined for dish:", dish.name);
                }
            }



            res.status(200).json({ success: true });
        } catch (error) {

            res.status(500).json({ success: false, error: error.message });
        }
    }
}
