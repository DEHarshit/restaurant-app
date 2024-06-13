import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/pages/local/userbuffer.json');

export default async function handler(req, res) {
    if (req.method == "GET") {
        const jsonData = await fsPromises.readFile(filePath);
        const objectData = JSON.parse(jsonData);
        res.status(200).json(objectData);
    } else if (req.method == "POST") {
        try {
            const jsonData = await fsPromises.readFile(filePath);
            const objectData = JSON.parse(jsonData);
            const { id, name, password, prevpass, role, email, phone } = req.body;

            const newData = {
                id: objectData.length + 1,
                name,
                password,
                prevpass,
                role,
                email,
                phone
            }

            objectData.push(newData)

            const updatedData = JSON.stringify(objectData);

            await fsPromises.writeFile(filePath, updatedData);

            res.status(201).json({ success: true,message: 'Data added successfully' });

        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else if (req.method == "PUT") {

        try {
            const jsonData = await fsPromises.readFile(filePath);
            const objectData = JSON.parse(jsonData);
            const { id, name, password, prevpass, role, email, phone } = req.body;

            const newData = {
                id: id,
                name,
                password,
                prevpass,
                role,
                email,
                phone
            }
            objectData[id-1] = newData;

            const updatedData = JSON.stringify(objectData);

            await fsPromises.writeFile(filePath, updatedData);

            res.status(201).json({ success: true,message: 'Data added successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    }
}