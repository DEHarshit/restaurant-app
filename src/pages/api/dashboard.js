import { query } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const mcount = await query({
      query: "SELECT COUNT(*) AS COUNT FROM DISHES",
      values: [],
    });

    const ocount = await query({
      query: "SELECT COUNT(*) AS COUNT FROM ORDERS",
      values: [],
    });

    const topdishes = await query({
      query:
        "SELECT DNAME,COUNT(DNAME) COUNT FROM ORDETAILS GROUP BY DNAME ORDER BY COUNT(*) DESC",
      values: [],
    });

    const itemsold = await query({
      query:
        "SELECT COUNT(*) COUNT FROM ORDETAILS D, ORDERS O WHERE D.OID = O.ID AND O.STATUS='FINISHED'",
      values: [],
    });

    const tsummary = await query({
      query: "SELECT STATUS,COUNT(*) COUNT FROM ORDERS GROUP BY STATUS",
      values: [],
    });

    res.status(200).json({ mcount, ocount, topdishes, tsummary, itemsold });
  }
}
