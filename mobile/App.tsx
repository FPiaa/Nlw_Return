import "react-native-gesture-handler";

import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { theme } from './src/theme';

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from 'react';
import Widget from './src/components/Widget';

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
              // Keep the splash screen visible while we fetch resources
              await SplashScreen.preventAutoHideAsync();
              await Font.loadAsync({
                  Inter_400Regular, Inter_500Medium
              });
            } catch (e) {
              console.warn(e);
            } finally {
              // Tell the application to render
                setAppIsReady(true);
            }
          }
      
          prepare();
        });

    const onLayoutRootView = useCallback(async () => {
        if(appIsReady) {
            setAppIsReady(true);
            await SplashScreen.hideAsync();
            console.log("Ready")
        }
    }, [appIsReady]); 

    if (!appIsReady) {
        console.log("Not ready");
        return null;
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.colors.background
        }}
            onLayout={onLayoutRootView}
        >

            <StatusBar 
                style="light"
                backgroundColor="transparent"
                translucent
            />
            <Widget />
        </View>
    );
}

