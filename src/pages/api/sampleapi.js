// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fsPromises from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "src/pages/local/samplebuffer.json");

export default async function handler(req, res) {
  if (req.method == "POST") {
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    const { name, password } = req.body;

    const newData = {
      name,
      password,
    };
    objectData.push(newData);

    const updatedData = JSON.stringify(objectData);

    await fsPromises.writeFile(filePath, updatedData);

    res.status(201).json({ message: "Data added successfully" });
  } else if (req.method == "PUT") {
    try {
      const jsonData = await fsPromises.readFile(filePath);
      const objectData = JSON.parse(jsonData);
      const { name, password } = req.body;

      const newData = {
        name,
        password,
      };
      objectData[0] = newData;

      await query({
        query: "INSERT INTO SAMPLE (ID,NAME,PASSWORD) VALUES (1,?,?)",
        values: [name, password],
      });

      const updatedData = JSON.stringify(objectData);

      await fsPromises.writeFile(filePath, updatedData);

      res.status(201).json({ message: "Data added successfully" });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
