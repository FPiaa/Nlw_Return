import { SubmitFeedbackService } from "./submit-feedback-service";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
);


describe("Submit Feedback", () => {
    it("should submit a base64 screenshot", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Example comment",
            screenshot: 'data:image/png;base64,asdfnbvahdjflkajdfkhadkhfjakdhf',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it("should submit a feedback on empty screenshot", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Example comment",
            screenshot: undefined,
        })).resolves.not.toThrow();
    });

    it("should throw an error if screenshot isn't in base64", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Example comment",
            screenshot: 'test.png',
        })).rejects.toThrow("Invalid Screenshot Format");
    });

    it("should throw an error if type is empty", async () => {
        await expect(submitFeedback.execute({
            type: "",
            comment: "Example comment",
            screenshot: 'test.png',
        })).rejects.toThrow("Type is Required");
    });

    it("should throw an error if comment is empty", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: 'test.png',
        })).rejects.toThrow("Comment is Required");
    })

})

