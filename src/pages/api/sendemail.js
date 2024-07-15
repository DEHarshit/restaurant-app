import nodemailer from "nodemailer";
import { query } from "../../lib/db"
import fs from "fs/promises";
import path from 'path';

const filePath = path.join(process.cwd(), 'src/pages/local/email.json');
export default async function handler(req, res) {
  if (req.method == "GET") {
    const stores = await query({
      query: "SELECT EMAIL FROM USERS WHERE ROLE='Stores Manager' LIMIT 1",
      values: []
    })

    const emailStatus = await fs.readFile(filePath, "utf-8");
    const objectData = JSON.parse(emailStatus);
    const date = objectData.date;

    res.status(200).json({ stores, date});
  } else if (req.method === "POST") {
    const { email, pdfBase64 } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: "drbddmsn@hotmail.com",
        pass: "nehusdqjuqdjyorf",
      },
    });

    const mailOptions = {
      from: "drbddmsn@hotmail.com",
      to: email,
      subject: "DRB-DDMSN - Restaurant Bill",
      text: "Please find attached your restaurant bill.",
      attachments: [
        {
          filename: "restaurant_bill.pdf",
          content: pdfBase64,
          encoding: "base64",
        },
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else if (req.method === "PUT") {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: "drbddmsn@hotmail.com",
        pass: "nehusdqjuqdjyorf",
      },
    });

    const mailOptions = {
      from: "drbddmsn@hotmail.com",
      to: email,
      subject: "DRB-DDMSN - Daily Refilling Reminder!",
      text: "This is a daily reminder to refill the vegetable stock for tomorrow!",
    };

    try {
      await transporter.sendMail(mailOptions);
      const emailStatus = await fs.readFile(filePath, "utf-8");
      const objectData = JSON.parse(emailStatus);
      objectData.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      await fs.writeFile(filePath, JSON.stringify(objectData));
      res.status(200).json({ message: "Email sent successfully", date:new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0] });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  }
}
