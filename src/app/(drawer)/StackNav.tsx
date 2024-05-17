import { Stack } from "expo-router"
import Privacy from "./Privacy"

export const StackNav = () => {

    return (
      <Stack screenOptions={{
        headerShown: true,
        
        headerTitleStyle: {

        }
    }}>
        <Stack.Screen name="Settings" options={{ headerShown: false }}  />
        <Stack.Screen name="Privacy"  options={{ headerShown: false }} />
        <Stack.Screen name="Help"  options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" options={{ headerShown: false }} />
        <Stack.Screen name="Security" options={{ headerShown: false }} />
      </Stack>
    )
  }