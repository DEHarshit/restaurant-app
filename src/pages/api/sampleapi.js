import { query } from "../../lib/db"

import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/pages/local/sample.json');

export default async function handler(req, res) {
    if (req.method == "GET"){
        const jsonData = await fsPromises.readFile(filePath);
        const objectData = JSON.parse(jsonData);
        res.status(200).json(objectData);
    }
    else if (req.method == "POST") {
        try {
            const jsonData = await fsPromises.readFile(filePath);
            const objectData = JSON.parse(jsonData);
            const { index, id, name, dept, pos, salary, hire, payroll_date } = req.body;

            const newData = {
                id: id,
                name: name,
                dept: dept,
                pos: pos,
                salary: salary,
                hire: hire,
                payroll_date: payroll_date
            }

            objectData[index]= newData

            const updatedData = JSON.stringify(objectData);

            await fsPromises.writeFile(filePath, updatedData);

            res.status(201).json({ success: true,message: 'Data added successfully' });

        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else if (req.method == "PUT") {
        try {
            const {index} = req.body;
            const jsonData = await fsPromises.readFile(filePath);
            const objectData = JSON.parse(jsonData);

            const emp = objectData[index];

            await query({
                query: "INSERT INTO PAYROLL (ID,NAME,DEPARTMENT,POSITION,SALARY,HIRE_DATE,PAYROLL_DATE) VALUES (?,?,?,?,?,?,SYSDATE()) ON DUPLICATE KEY UPDATE NAME=VALUES(NAME),NAME=VALUES(NAME),DEPARTMENT=VALUES(DEPARTMENT),POSITION=VALUES(POSITION),SALARY=VALUES(SALARY),HIRE_DATE=VALUES(HIRE_DATE),PAYROLL_DATE=VALUES(PAYROLL_DATE)",
                values: [emp.id,emp.name,emp.dept,emp.pos,emp.salary,emp.hire]
            })


            const hireDate = new Date(emp.hire);
            const payrollDate = new Date(emp.payroll_date);
            const expDate = Math.ceil((payrollDate - hireDate) / (1000 * 60 * 60 * 24));

            await query({
                query: "UPDATE PAYROLL SET EXPERIENCE=? WHERE ID=?",
                values: [expDate, emp.id]
            });

            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } 
}