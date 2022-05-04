import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

dotenv.config();

const MAIL_USER = process.env.EMAIL_USER;
const MAIL_PASS = process.env.EMAIL_PASSWORD;

const app = express();
app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
  });

app.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body;
    
    const feedback = await prisma.feedback.create({
        data: {
            type, comment, screenshot
        }
    });

    await transport.sendMail({
        from: "Equipe Feedget <oi@feedget.com>",
        to: "Igor <email@teste.com>",
        subject: "Novo feedback",
        html: [
            `<p> Tipo do Feedback ${type}</p>`,
            `<p> Comentário: ${comment}</p>`,
        ].join('\n')
    })

    return res.status(201).json({data: feedback});
});

app.listen(3333, () => {
    console.log("http server running");
});