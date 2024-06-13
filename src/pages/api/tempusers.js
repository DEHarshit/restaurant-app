import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/pages/local/userbuffer.json');

export default async function handler(req,res){
    if (req.method == "GET"){
        const jsonData = await fsPromises.readFile(filePath);
        const objectData = JSON.parse(jsonData);
        res.status(200).json(objectData);
    } else if (req.method == "POST"){

    } else if (req.method == "PUT"){

    }
}