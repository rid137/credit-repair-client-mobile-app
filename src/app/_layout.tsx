import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
// import "./nativewind-output";
import { NativeWindStyleSheet } from "nativewind";
import { Toasts, toast } from '@backpackapp-io/react-native-toast';

NativeWindStyleSheet.setOutput({
  default: "native",
});
import { useColorScheme } from '@/components/useColorScheme';
import { PaperProvider } from 'react-native-paper';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import { store } from "../store/store"
import { Provider } from 'react-redux'
import { AuthContextProvider } from '@/context/authcontext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import { Toasts } from '@backpackapp-io/react-native-toast';

// import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    toast('Hello');
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  // const theme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     primary: 'tomato',
  //     secondary: 'yellow',
  //   },
  // };

  return (
    <AuthContextProvider>
    <Provider store={store}>

    <PaperProvider>
      {/* <GestureHandlerRootView> */}


      {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
        <Stack>
          <Toasts />
          {/* <Stack.Screen name="(settings)" options={{ headerShown: false }} /> */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="editProfilePage" 
            options={{ 
              headerTitle: "Edit Profile",
              headerStyle: {
                // backgroundColor: "#0163d2",
                
                // paddingVertical: 
                
                
              },
              headerTitleAlign: "left",
              headerTitleStyle: {
                // display: "none"
                
                fontSize: 16,
                fontWeight: "bold"
              },
              headerRight: () => (
                <Link href="/(drawer)/Settings" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Image source={ require("../../assets/images/profileImg.png") } style={{width: 40, height: 40, opacity: pressed ? 0.5 : 1 }} />
                    )}
                  </Pressable>
                </Link>
              ),
            }} 
          />

          {/* <Stack.Screen name="help"
            options={{ 
              headerTitle: "Help & Support",
              headerTitleStyle: {
                fontSize: 16,
                fontWeight: "bold"
              },
              headerRight: () => (
                <Link href="/(drawer)/Settings" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Image source={ require("../../assets/images/profileImg.png")} style={{width: 40, height: 40, opacity: pressed ? 0.5 : 1 }} />
                    )}
                  </Pressable>
                </Link>
              ),
            }} 
          /> */}

          {/* <Stack.Screen name="security"
            options={{ 
              headerTitle: "Security",
              headerTitleStyle: {                
                fontSize: 16,
                fontWeight: "bold"
              },
              headerRight: () => (
                <Link href="/(drawer)/Settings" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Image source={ require("../../assets/images/profileImg.png")} style={{width: 40, height: 40, opacity: pressed ? 0.5 : 1 }} />
                    )}
                  </Pressable>
                </Link>
              ),
            }} 
          /> */}

          {/* <Stack.Screen name="privacy"
            options={{ 
              headerTitle: "Privacy policy",
              headerTitleStyle: {
                fontSize: 16,
                fontWeight: "bold"
              },
              headerRight: () => (
                <Link href="/(drawer)/Settings" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Image source={ require("../../assets/images/profileImg.png")} style={{width: 40, height: 40, opacity: pressed ? 0.5 : 1 }} />
                    )}
                  </Pressable>
                </Link>
              ),
            }} 
          /> */}

          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      {/* </ThemeProvider> */}
      {/* <Toasts /> */}
    {/* </GestureHandlerRootView> */}

    </PaperProvider>
    </Provider>
    </AuthContextProvider>
  );
}
