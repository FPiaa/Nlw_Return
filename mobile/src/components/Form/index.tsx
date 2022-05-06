import * as FileSystem from "expo-file-system";
import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { captureScreen } from "react-native-view-shot";
import { api } from '../../lib/api';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { ScreenshotButton } from '../ScreenshotButton';
import { FeedbackType } from '../Widget';

import { styles } from './styles';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent}: Props) {
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [screenshot, setScreenshot] = useState<string| null>(null);
    const [comment, setComment] = useState<string>('');

    function handleScreenshot() {
        captureScreen({
            format: 'png',
            quality: 0.9
        })
        .then(uri => setScreenshot(uri))
        .catch(e => console.warn(e));
    }

    function handleScreenshotRemove() {
        setScreenshot(null);
    }

    async function handleSendFeedback() {
        if(isSendingFeedback || !comment) {
            return;
        }
        setIsSendingFeedback(true);
        const screenshotAsBase64 = screenshot && 
                                        await FileSystem
                                        .readAsStringAsync(screenshot, {
                                        encoding: 'base64'
                                    }); 
        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                comment,
                screenshot: `data:image/png;base64,${screenshotAsBase64}`
            })
            onFeedbackSent();
        } catch (error) {
           console.warn(error); 
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft 
                        size={24}
                        weight="bold"
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Image 
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>
            <TextInput 
                multiline
                style={styles.textInput}
                placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo."
                placeholderTextColor={theme.colors.text_secondary}
                autoCorrect={false}
                onChangeText={setComment}
            />

            <View style={styles.footer}>
                <ScreenshotButton 
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                /> 
                <Button onPress={handleSendFeedback} isLoading={isSendingFeedback}/>
            </View>
        </View>
  );
}