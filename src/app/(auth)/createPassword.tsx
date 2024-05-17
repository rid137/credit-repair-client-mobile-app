import Background from '@/components/BackgroundImage'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import { Title } from 'react-native-paper';
import FormInput from "@components/FormInput";
import FormButton from '@components/FormButton';
import { COLORS, SIZES } from '@/constants'
import { authCommonstyles } from '.'
import TouchBtn from '@/components/TouchBtn'
import { Image } from 'react-native'
import { z } from 'zod'
import { UserAuth } from '@/hooks/useAuthContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyboardAvoidingView } from 'react-native'

const passwordSchema = z.object({
    password: z.string().min(5, { message: "Password must be 5 or more characters long" }),
    confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"]
    })
  
type FormFields = z.infer<typeof passwordSchema>;


const CreatePassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user, setUser, cardDetails } = UserAuth();



    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
    resolver: zodResolver(passwordSchema),
    });

    console.log("user", user)
    console.log("cardDetails", cardDetails)


  return (
    <Background>
        <StatusBar barStyle="light-content" />

        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={authCommonstyles?.container}>
        
                    <View style={authCommonstyles?.cardContainer}>
                        {/* <Link href={"/(auth)/login"}><Text style={authCommonstyles?.logo}>Logo Here</Text></Link> */}
                        <View style={{backgroundColor: COLORS?.primary}}>
                        <Image     source={ require("../../../assets/images/logo.png")} />


                        </View>

                        <Text style={{color: Colors?.base?.primary, fontSize: SIZES?.large, marginBottom: 20, marginTop: 5}}>Create Password</Text>

                        <Text style={{marginBottom: 20, textAlign: "center" }}>To keep your account safe, we need a strong password</Text>

                        <View style={{width: "100%"}}>
                            {/* <Text style={styles?.label}>Email</Text> */}
                            <FormInput
                                labelName='Password'
                                value={email}
                                autoCapitalize='none'
                                onChangeText={(userEmail : string) => setEmail(userEmail)}
                            />

                            {/* <Text style={styles?.label}>Password</Text> */}
                            <FormInput
                                labelName='Confirm Password'
                                value={password}
                                secureTextEntry={true}
                                onChangeText={(userPassword: string) => setPassword(userPassword)}
                            />
                        </View>

                        <View style={{width: "100%"}}>
                            {/* <Button text='Log In'/> */}
                            <TouchBtn text='Continue' onPress={() => router.push("/(auth)/")} />



                        </View>
                        


                    {/* <Link href="/(auth)/signUp">Go Modal</Link> */}
                    {/* <Link href="/modal">Go Modal</Link> */}
                    </View>

                    {/* <View className="flex-1 items-center text-red-600 justify-center bg-white">
                        <Text>Open up App.js to start working on your app!</Text>
                        <StatusBar style="auto" />
                    </View> */}

                    {/* <ActivityIndicator size={'large'} animating={true} color={MD2Colors.red800} /> */}

                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
    </Background>
  )
}

export default CreatePassword