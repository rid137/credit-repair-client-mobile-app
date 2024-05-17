import Background from '@/components/BackgroundImage'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import { Link, router, useNavigation } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import { Title } from 'react-native-paper';
import FormInput from "@components/FormInput";
import FormButton from '@components/FormButton';
import { COLORS, SIZES } from '@/constants'
import OtpTextInput from 'react-native-text-input-otp'
import TouchBtn from '@/components/TouchBtn'
import { Image } from 'react-native'


const { width, height } = Dimensions.get('screen');

const SecurityCode = () => {
    const [otp, setOtp] = React.useState('');

    

    const handleClick = () => {
        router.push("/(auth)/resetPassword")
        console.warn("Your otp is ",otp)
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

                    <Text style={{textAlign: "center", color: Colors?.base?.primary, fontSize: SIZES?.large, marginBottom: 20, marginTop: 5}}> Security code to reset password</Text>

                    <Text style={{marginBottom: 20, textAlign: "center"}}>Insert the security code sent to your email in order to proceed with the password reset.</Text>

                    <View style={{width: "100%", marginBottom: 20}}>
                        {/* <Text style={styles?.label}>Email</Text> */}
                        <OtpTextInput
                            otp={ otp }
                            setOtp={ setOtp }
                            digits={4}
                            style={{ borderRadius: 0, borderTopWidth: 0 , borderRightWidth:0, borderLeftWidth:0, height: 45 }}
                            fontStyle={{ fontSize: 20, fontWeight: 'bold' }}
                            focusedStyle={{ borderColor: COLORS?.primary, borderBottomWidth: 2 }} 
                        />
                    </View>

                    <Link href={"/(auth)/forgetPassword"} style={{color: COLORS?.primary, alignSelf: "flex-end", fontSize: SIZES?.small}}>Request a new code</Link>

                    <View style={{width: "100%"}}>
                        {/* <Button text='Submit' onPress={handleClick}/> */}
                        <TouchBtn text='Submit' onPress={handleClick} />

                        


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

export default SecurityCode
