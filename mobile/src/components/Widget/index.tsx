import { ChatTeardropDots } from "phosphor-react-native";
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

export function Widget() {
    return (
        <>
            <TouchableOpacity>
                <ChatTeardropDots
                    size={24}
                    weight={"bold"}
                    color={theme.colors.text_on_brand_color}
                />
            </TouchableOpacity>
        </>
    );
}