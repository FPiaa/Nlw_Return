import express from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeebackRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackService } from "./services/submit-feedback-service";


export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedbackRepository = new PrismaFeebackRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbackRepository , nodemailerMailAdapter
    );

    submitFeedbackService.execute({
        type, comment, screenshot
    }).then(() => {
        return res.status(201).send();
    });
});