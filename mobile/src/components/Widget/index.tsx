import React, { useRef, useState } from 'react';

import BottomSheet from "@gorhom/bottom-sheet";
import { ChatTeardropDots } from "phosphor-react-native";
import { TouchableOpacity } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Options } from '../Options';
import { Success } from '../Success';
import { styles } from "./styles";


export type FeedbackType = keyof typeof feedbackTypes;

export function Widget() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackWasSent, setFeedbackWasSent] = useState(false);


    function handleOpenGesture() {
        bottomSheetRef.current?.expand();
    }

    function handleFeedbackRestart() {
        setFeedbackType(null);
        setFeedbackWasSent(false);
    }

    return (
        <>
            <TouchableOpacity style={styles.button}
                onPress={handleOpenGesture}
            >
                <ChatTeardropDots
                    size={24}
                    weight={"bold"}
                    color={theme.colors.text_on_brand_color}
                />
            </TouchableOpacity>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[1, 280]}   
                backgroundStyle={styles.modal}
                handleIndicatorStyle={styles.indicator}
            >
                {
                    feedbackWasSent ?
                    <Success onNewFeedback={handleFeedbackRestart}/>
                    :
                    feedbackType ?
                        <Form 
                            feedbackType={feedbackType}
                            onFeedbackCanceled={handleFeedbackRestart}
                            onFeedbackSent={() => setFeedbackWasSent(true)}
                        /> 
                        :
                        <Options onFeedbackSelect={setFeedbackType}/>

                }
            </BottomSheet>
        </>
    );
}

export default gestureHandlerRootHOC(Widget);