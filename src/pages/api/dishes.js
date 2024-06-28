// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/pages/local/buffer.json');

export default async function handler(req, res) {

    if (req.method == "GET") {
        const dishes = await query({
            query: "SELECT D.ID,D.NAME,DESCRIPTION,IMAGE,SPECIAL,PRICE,ISVEG,D.TYPE,ISPRE,COUNT FROM DISHES D",
            values: []
        })
        res.status(200).json({ dishes });
    }

    if (req.method == "POST") {
        try {
            const { index } = req.body;
            const jsonData = await fsPromises.readFile(filePath);
            const objectData = JSON.parse(jsonData);
    
            if (index < 0 || index >= objectData.length) {
                return res.status(400).json({ success: false, error: "Invalid index" });
            }
    
            const dish = objectData[index];
    
            await query({
                query: "INSERT INTO DISHES (ID,IMAGE,NAME,DESCRIPTION,PRICE,SPECIAL,ISVEG,ISPRE,COUNT) VALUES (?,?,?,?,?,?,?,?,0) ON DUPLICATE KEY UPDATE IMAGE=VALUES(IMAGE),NAME=VALUES(NAME),DESCRIPTION=VALUES(DESCRIPTION),PRICE=VALUES(PRICE),SPECIAL=VALUES(SPECIAL),ISVEG=VALUES(ISVEG),ISPRE=VALUES(ISPRE)",
                values: [dish.id, dish.image || '/placeholder.png', dish.name || '', '', dish.price, false, dish.isveg,dish.ispre]
            });
    
            let timings = dish.type[0] || '';
            if (Array.isArray(dish.type) && dish.type.length > 1) {
                for (let i = 1; i < dish.type.length; i++) {
                    timings = timings.concat(",", dish.type[i]);
                }
            }
            await query({
                query: `UPDATE DISHES SET TYPE =? WHERE ID=?`,
                values: [timings, dish.id]
            });
    
            if (Array.isArray(dish.ing) && Array.isArray(dish.qty) && dish.ing.length === dish.qty.length) {
                await query({
                    query: "DELETE FROM RECIPES WHERE DID = ?",
                    values: [dish.id]
                });
    
                for (let i = 0; i < dish.ing.length; i++) {
                    const ing = dish.ing[i];
                    const qty = dish.qty[i];
                    await query({
                        query: "INSERT INTO RECIPES (DID, INAME, QTY) VALUES (?, ?, ?)",
                        values: [dish.id, ing || null, qty || null]
                    });
                }
            } else {
                console.error("Error: Ingredients or quantities are not properly defined for dish:", dish.name);
            }
    
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else if (req.method === "PUT") {
        try {
            const { special } = req.body;
            await query({
                query: "UPDATE DISHES SET SPECIAL=?",
                values: [false]
            })
            await query({
                query: "UPDATE DISHES SET SPECIAL=? WHERE NAME=?",
                values: [true, special]
            })
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    }
}
