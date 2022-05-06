import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequest: () => void;
    isFeedbackSent: () => void
}
export function FeedbackContentState({
                        feedbackType, 
                        onFeedbackRestartRequest,
                        isFeedbackSent
                    }: FeedbackContentProps) {

    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState<string>('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();

        setIsSendingFeedback(true);
        await api.post('/feedbacks', {
            type: feedbackType,
            comment, screenshot
        });
        
        setIsSendingFeedback(false);
        isFeedbackSent();
    }

    return (
        <>
            <header>
                <button type="button"
                        className="top-5 left-5 absolute text-zinc-400
                                    hover:text-zinc-100"
                        onClick={onFeedbackRestartRequest}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>

                <span className="text-xl leading-6 flex items-center gap-2 ">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.source} 
                        className="w-6 h-6"
                    />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>
            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400
                            text-zinc-100 border-zinc-600 bg-transparent 
                            rounded-md focus:border-brand-500 focus:ring-brand-500
                            focus:ring-1 focus:outline-none resize-none 
                            scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent
                            "
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={event => setComment(event.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton 
                        onScreenshotTook={setScreenshot}
                        screenshot={screenshot}
                    /> 
                    <button
                        type="submit"
                        disabled={comment.length === 0 || isSendingFeedback}
                        className="p-2 bg-brand-500 rounded-md border-transparent
                            flex-1 justify-center items-center text-sm hover:bg-brand-300
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            focus:ring-offset-zinc-900 focus:ring-brand-500
                            trasition-colors disabled:opacity-50 disabled:hover:bg-brand-500"   

                    >
                        {
                            isSendingFeedback ? 
                            (
                                // for some dumb reason I need this div                                
                                // loading is already flex justify content 
                                // if i dont do this the loading animation
                                // wont be centralized
                                <div className="flex justify-center">
                                    <Loading  /> 
                                </div>
                            )
                            : 
                            "Enviar Feedback" 
                       }
                    </button>
                </footer>
            </form>
        </>
    ) 
}