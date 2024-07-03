import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, pdfBase64 } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: "drbddmsn@hotmail.com",
        pass: "jqgldudsaucytbbi",
      },
    });

    const mailOptions = {
      from: "drbddmsn@hotmail.com",
      to: email,
      subject: "Restaurant Bill",
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
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
