// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/pages/local/supplybuffer.json');
const imagePath = path.join(process.cwd(), 'public/dishes')

export default async function handler(req, res) {

    if (req.method == "GET") {
        const jsonData = await fsPromises.readFile(filePath);
        const objectData = JSON.parse(jsonData);
        res.status(200).json(objectData);
    }

    if (req.method == "POST") {
        const jsonData = await fsPromises.readFile(filePath);
        const objectData = JSON.parse(jsonData);
        const { index, price, stock, stockQty, exp, sup } = req.body;

        const newData = {
            id: index + 1,
            price,
            stock,
            stockQty,
            exp,
            sup
        }
        objectData.push(newData)

        const updatedData = JSON.stringify(objectData);

        await fsPromises.writeFile(filePath, updatedData);

        res.status(200).json({ message: 'Data added successfully' });

    }

    if (req.method == "PUT") {
        const jsonData = await fsPromises.readFile(filePath);
        const objectData = JSON.parse(jsonData);
        const { index, price, stock, stockQty, exp, sup } = req.body;

        const newData = {
            id: index + 1,
            price,
            stock,
            stockQty,
            exp,
            sup
        }
        objectData[index] = newData;

        const updatedData = JSON.stringify(objectData);

        await fsPromises.writeFile(filePath, updatedData);

        res.status(201).json({ message: 'Data added successfully' });

    }

    if (req.method == "DELETE") {
        try {
            const { index } = req.body;
            const jsonData = await fsPromises.readFile(filePath);
            const objectData = JSON.parse(jsonData);

            if (index < 0 || index >= objectData.length) {
                return res.status(400).json({ success: false, error: "Invalid index" });
            }

            const supply = objectData[index];
            const prices = supply.price.map(Number);
            const totalPrice = prices.reduce((total, price) => total + price, 0);

            await query({
                query: "INSERT INTO SUPPLIES (ID,SUPPLIED_DATE,PRICE) VALUES (?,?,?) ON DUPLICATE KEY UPDATE SUPPLIED_DATE=VALUES(SUPPLIED_DATE), PRICE=VALUES(PRICE) ",
                values: [supply.id, supply.sup, totalPrice]
            });

            if (Array.isArray(supply.stock) && Array.isArray(supply.stockQty) && supply.stock.length === supply.stockQty.length) {
                await query({
                    query: "DELETE FROM STOCK WHERE SID = ?",
                    values: [supply.id]
                });

                for (let i = 0; i < supply.stock.length; i++) {
                    const ing = supply.stock[i];
                    const qty = supply.stockQty[i];
                    const exp = supply.exp[i]
                    await query({
                        query: "INSERT INTO STOCK (INAME,QTY,SUPPLIED_DATE,EXP_DATE,SID) VALUES (?,?,?,?,?)",
                        values: [ing, qty,supply.sup, exp, supply.id]
                    });
                }
            } else {
                console.error("Error: Ingredients or quantities are not properly defined for dish:", supply.id);
            }

            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};