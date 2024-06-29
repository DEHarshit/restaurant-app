// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
export default async function handler(req, res) {

    if (req.method == "GET") {
        const stock = await query({
            query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME ORDER BY INAME",
            values: []
        })
        const mstock = await query({
            query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Meat'",
            values: []
        })
        const vstock = await query({
            query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Vegetables'",
            values: []
        })
        const gstock = await query({
            query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Groceries'",
            values: []
        })
        const cstock = await query({
            query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Condiment'",
            values: []
        })
        res.status(200).json({ stock, mstock, vstock, gstock, cstock });
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

            const mstock = await query({
                query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Meat'",
                values: []
            })
            const vstock = await query({
                query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Vegetables'",
                values: []
            })
            const gstock = await query({
                query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Groceries'",
                values: []
            })
            const cstock = await query({
                query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Condiment'",
                values: []
            })

            res.status(200).json({ stock, mstock, vstock, gstock, cstock });
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

            const mstock = await query({
                query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Meat'",
                values: []
            })
            const vstock = await query({
                query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Vegetables'",
                values: []
            })
            const gstock = await query({
                query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Groceries'",
                values: []
            })
            const cstock = await query({
                query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Condiment'",
                values: []
            })
            res.status(200).json({ stock, mstock, vstock, gstock, cstock });
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

            const mstock = await query({
                query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Meat'",
                values: []
            })
            const vstock = await query({
                query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Vegetables'",
                values: []
            })
            const gstock = await query({
                query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Groceries'",
                values: []
            })
            const cstock = await query({
                query: "SELECT S.ID,INAME,QTY,UOM,SUPPLIED_DATE,EXP_DATE,TYPE,SID FROM STOCK S LEFT JOIN  INGREDIENTS I ON S.INAME = I.NAME WHERE TYPE='Condiment'",
                values: []
            })
            res.status(200).json({ stock, mstock, vstock, gstock, cstock });
        } catch (error) {
            res.status(500).json({ success:false, error: error.message });
        }
    }
}
