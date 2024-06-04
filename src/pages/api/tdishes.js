// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/pages/local/buffer.json');
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
        const { index,image, name, price, type, ing, qty, isveg } = req.body;

        let imageUrl = image;
        if (image !== '/placeholder.png' && image.indexOf('/dishes/') === -1) {
            const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            const imageName = `${name.replace(/\s+/g, '-').toLowerCase()}.png`;
            const imagePaths = path.join(imagePath, imageName);
            await fsPromises.writeFile(imagePaths, buffer);

            imageUrl = `/dishes/${imageName}`;
        }
        const newData = {
            id:index+1,
            image: imageUrl,
            name,
            type,
            price,
            ing,
            qty,
            isveg
        }
        objectData.push(newData)

        const updatedData = JSON.stringify(objectData);

        await fsPromises.writeFile(filePath, updatedData);

        res.status(201).json({ message: 'Data added successfully' });

    }

    if (req.method == "PUT") {
        const jsonData = await fsPromises.readFile(filePath);
        const objectData = JSON.parse(jsonData);
        const { image, name, price, type, ing, qty, isveg, index } = req.body;

        let imageUrl = image;
        if (image !== '/placeholder.png' && image.indexOf('/dishes/') === -1) {
            const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            const imageName = `${name.replace(/\s+/g, '-').toLowerCase()}.png`;
            const imagePaths = path.join(imagePath, imageName);
            await fsPromises.writeFile(imagePaths, buffer);

            imageUrl = `/dishes/${imageName}`;
        }
        const newData = {
            id:index+1,
            image: imageUrl,
            name,
            type,
            price,
            ing,
            qty,
            isveg
        }
        objectData[index] = newData;

        const updatedData = JSON.stringify(objectData);

        await fsPromises.writeFile(filePath, updatedData);

        res.status(201).json({ message: 'Data added successfully' });

    }

}




export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb', // Adjust the size limit as needed
        },
    },
};