import Background from '@/components/BackgroundImage'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import { Title } from 'react-native-paper';
import FormInput from "@components/FormInput";
import FormButton from '@components/FormButton';
import { COLORS, SIZES } from '@/constants'
import TouchBtn from '@/components/TouchBtn'
import { Image } from 'react-native'

const { width, height } = Dimensions.get('screen');

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        router.push("/(auth)/securityCode")
    }

  return (
    <Background>
        <StatusBar barStyle="light-content" />

        <SafeAreaView>
            <View style={authCommonstyles?.container}>
                

                <View style={authCommonstyles?.cardContainer}>
                    {/* <Link href={"/(auth)/createPassword"}><Text style={authCommonstyles?.logo}>Logo Here</Text></Link> */}
                    <View style={{backgroundColor: COLORS?.primary}}>
                      <Image source={ require("../../../assets/images/logo.png")} />
                    </View>

                    <Text style={{color: Colors?.base?.primary, fontSize: SIZES?.large, marginBottom: 20, marginTop: 5}}>Forgot Password</Text>

                    <Text style={{marginBottom: 20, textAlign: "center"}}>You can request a password reset below. We will send a security code to the email address, please make sure it is correct.</Text>

                    <View style={{width: "100%"}}>
                        {/* <Text style={styles?.label}>Email</Text> */}
                        <FormInput
                            labelName='Enter email'
                            value={email}
                            autoCapitalize='none'
                            onChangeText={(userEmail : string) => setEmail(userEmail)}
                        />

                        {/* <Text style={styles?.label}>Password</Text> */}
                        {/* <FormInput
                            labelName='Password'
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(userPassword: string) => setPassword(userPassword)}
                        /> */}
                    </View>

                    <Link href={"/(auth)/"} style={{color: COLORS?.primary, alignSelf: "flex-end", fontSize: SIZES?.small}}>Back to LogIn</Link>

                    <View style={{width: "100%"}}>
                        {/* <Button text='Request Password Reset' onPress={handleClick}/> */}
                        <TouchBtn text='Request Password Reset' onPress={handleClick} />



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

        </SafeAreaView>
    </Background>
  )
}

export const authCommonstyles = StyleSheet.create({
    container: {
        // flex: 1, 

        flexDirection: "column",
        // marginTop: 7,
        justifyContent: "center", 
        alignItems: "center",
        color: "#fff",
        paddingLeft: 20,
        paddingRight: 20,
        
    },
    cardContainer: {
        backgroundColor: COLORS?.grayBg,
        // height: 300,
        // width: "100%",
        width: width / 1.1,
        // flex: 1,
        alignItems: "center",
        padding: 20,
       
        // justifyContent: "center"
    },
    logo: {
        fontWeight: "bold",
        fontSize: 32,
        // marginBottom: 20
    },
    label: {
        fontSize: SIZES?.small,
        fontWeight: "bold"

    }

})

export default ForgotPassword
