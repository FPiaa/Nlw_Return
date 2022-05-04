import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeProps {
    onFeedbackTypeChange: (arg: FeedbackType) => void
}

export function FeedbackTypeState(props: FeedbackTypeProps) {
    return (
        <>
        <header>
                <CloseButton />
                <span className="text-xl leading-6">Deixe seu feedback</span>
        </header>
        <div className="flex py-8 gap-2 w-full">
            { Object.entries(feedbackTypes).map(([key, value]) => {
                return(
                    <button
                        className="bg-zinc-800 rounded py-5 w-24 flex-1 
                                flex  flex-col items-center gap-2 border-2 
                                border-transparent hover:border-brand-500 
                                focus:border-brand-500 focus:outline-none"    
                        type="button"
                        key={key}
                        onClick={() => props.onFeedbackTypeChange(key as FeedbackType)}
                    >
                        <img src={value.image.source} alt={value.image.alt} />
                        <span>{value.title}</span>
                    </button>
                )
                }) }
        </div>
        </>
    ) 
}