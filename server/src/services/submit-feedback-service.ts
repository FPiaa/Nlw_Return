import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

export interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter  
    ) {}

    async execute(request: SubmitFeedbackServiceRequest) {
        const { type, comment, screenshot } = request;
        await this.feedbacksRepository.create( {
            type, comment, screenshot
        });

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback", 
            body: [
                "<html>",
                `<p>Tipo do Feedback ${type}</p>`,
                `<p>Comentário: ${comment} </p>`,
                "</html>"
            ].join('\n')
        });
    }   
}