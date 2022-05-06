import React from 'react';
import { Image, ImageProps, Text, TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './styles';

interface Props extends TouchableOpacityProps {
    title: string,
    image: ImageProps
}

export function Option({title, image, ...rest}: Props) {
    return (
        <TouchableOpacity 
            style={styles.container}
            {...rest}    
        >
            <Image 
                source={image}
                style={styles.image}
            />

            <Text style={styles.title}> {title} </Text>
        </TouchableOpacity>
    );
}