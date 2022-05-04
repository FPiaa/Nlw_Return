import successImageUrl from "../../../assets/success.svg";
import { CloseButton } from "../../CloseButton";

interface FeedbackSuccessProps {
    onFeedbackRestartRequest: () => void;
}

export function FeedbackSuccessState({onFeedbackRestartRequest}: FeedbackSuccessProps) {
    return (
        <>
            <header>
                <CloseButton />
            </header>
            <div className="flex flex-col items-center py-10 w-[304px]">
                <img src={successImageUrl} alt="Imagem de confirmação de envio" />
                <span className="text-xl mt-2">Agradecemos o feedback!</span>
                <button type="button" 
                    onClick={onFeedbackRestartRequest}
                    className="py-2 px-6 mt-6 bg-zinc-800 rounded-md
                    border-transparent text-sm leading-6 hover:bg-zinc-700
                    trasition-colors focus:border-brand-500 focus:ring-brand-500
                    focus:ring-1 focus:outline-none"
                >Quero enviar outro</button>
            </div>
        </>
    )
}