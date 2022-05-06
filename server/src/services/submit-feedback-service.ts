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
    
    //TODO: ADD SOME ERROR TYPE
    async execute(request: SubmitFeedbackServiceRequest) {
        const { type, comment, screenshot } = request;

        if(!type) {
            throw new Error("Type is Required");
        }
        if(!comment) {
            throw new Error("Comment is Required");
        }
        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("Invalid Screenshot Format");
        }

        await this.feedbacksRepository.create( {
            type, comment, screenshot
        });
        let body = `<html><p>Tipo do Feeback ${type}</p><p>Comentário: ${comment}</p>`
        if (screenshot) {
            body.concat(`<img src=${screenshot} />`)
        }
        body.concat('</html>')

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback", 
            body 
        });
    }   
}