import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

dotenv.config();
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASSWORD;

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
  });


export class NodemailerMailAdapter implements MailAdapter {

    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "Igor <email@teste.com>",
            subject,
            html: body,
        });
    }
}