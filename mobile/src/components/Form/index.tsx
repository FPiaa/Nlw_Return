import { ArrowLeft } from 'phosphor-react-native';
import React, {useState} from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { ScreenshotButton } from '../ScreenshotButton';
import { FeedbackType } from '../Widget';
import { captureScreen } from "react-native-view-shot";

import { styles } from './styles';

interface Props {
    feedbackType: FeedbackType
}

export function Form({feedbackType}: Props) {
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [screenshot, setScreenshot] = useState<string| null>(null);

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.9
        })
        .then(uri => setScreenshot(uri))
        .catch(e => console.warn(e));
    }

    function handleScreenshotRemove() {
        setScreenshot(null);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
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
            />

            <View style={styles.footer}>
                <ScreenshotButton 
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                /> 
                <Button isLoading={false}/>
            </View>
        </View>
  );
}