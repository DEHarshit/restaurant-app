// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "../../lib/db"
export default async function handler(req, res) {
    
    if(req.method == "GET"){
        const ingredients = await query({
            query:"SELECT * FROM INGREDIENTS ORDER BY NAME                                                                                                                                                                  ",
            values:[]
        })
        res.status(200).json({ingredients});
    }
  }
  