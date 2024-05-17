import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
    return (
    <Stack screenOptions={{}}>
        <Stack.Screen 
          name="index" 
          options={{
            title: "Login",
            headerShown: false,
            headerRight: () => (
            //   <Link href="/(admin)/menu/create" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="plus-square-o"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
            //   </Link>
            ),
          }} 
          
        />


        <Stack.Screen 
          name="register" 
          options={{
            title: "Register",
            headerShown: false,
            headerRight: () => (
            //   <Link href="/(admin)/menu/create" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
            //   </Link>
            ),
          }} 
          
        />

        <Stack.Screen 
          name="paymentDetails" 

          options={{
            title: "Payment Details",
            headerShown: false,

            
          }} 
          
        />

        <Stack.Screen 
          name="login" 
          options={{
            title: "Login",
            headerRight: () => (
            //   <Link href="/(admin)/menu/create" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
            //   </Link>
            ),
          }} 
          
        />

        <Stack.Screen 
          name="createPassword" 

          options={{
            title: "Create Password",
            headerShown: false,

            
          }} 
          
        />

        <Stack.Screen 
          name="forgetPassword" 

          options={{
            title: "Create Password",
            headerShown: false,

            
          }} 
          
        />

        <Stack.Screen 
          name="resetPassword" 

          options={{
            title: "Reset Password",
            headerShown: false,

            
          }} 
          
        />

        <Stack.Screen 
          name="documentUpload" 

          options={{
            title: "Upload Document",
            headerShown: false,

            
          }} 
          
        />

        <Stack.Screen 
          name="securityCode"
          options={{
            title: "Security Code",
            headerShown: false,
          }} 
          
        />

        

          
    </Stack>
    )
}