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
import { authCommonstyles } from '.'
import TouchBtn from '@/components/TouchBtn'
import { Image } from 'react-native'

const { width, height } = Dimensions.get('screen');

const CreatePassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <Background>
        <StatusBar barStyle="light-content" />

        <SafeAreaView>
            <View style={authCommonstyles?.container}>
    
                <View style={authCommonstyles?.cardContainer}>
                    {/* <Link href={"/(auth)/login"}><Text style={authCommonstyles?.logo}>Logo Here</Text></Link> */}
                    <View style={{backgroundColor: COLORS?.primary}}>
                      <Image source={ require("../../../assets/images/logo.png")} />


                    </View>

                    <Text style={{color: Colors?.base?.primary, fontSize: SIZES?.large, marginBottom: 20, marginTop: 5}}>Reset your password</Text>

                    <Text style={{marginBottom: 20, textAlign: "center" }}>Insert your new password</Text>

                    <View style={{width: "100%"}}>
                        {/* <Text style={styles?.label}>Email</Text> */}
                        <FormInput
                            labelName='Enter new password'
                            value={email}
                            autoCapitalize='none'
                            onChangeText={(userEmail : string) => setEmail(userEmail)}
                        />

                        {/* <Text style={styles?.label}>Password</Text> */}
                        <FormInput
                            labelName='Confirm new password'
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(userPassword: string) => setPassword(userPassword)}
                        />
                    </View>

                    <View style={{width: "100%"}}>
                        {/* <Button text='Submit' onPress={() => router.push("/(auth)")}> </Button> */}
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

        </SafeAreaView>
    </Background>
  )
}

export default CreatePassword