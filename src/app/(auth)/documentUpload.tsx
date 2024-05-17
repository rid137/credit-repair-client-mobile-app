import Background from '@/components/BackgroundImage'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import { Title } from 'react-native-paper';
import FormInput from "@components/FormInput";
import FormButton from '@components/FormButton';
import { COLORS, SIZES } from '@/constants'
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native'
import { authCommonstyles } from '.'
import TouchBtn from '@/components/TouchBtn'
import { UserAuth } from '@/hooks/useAuthContext'
import ReuseInput from '@/components/ReuseInput'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const docSchema = z.object({
    socialSecurityNumber: z.string().min(5, { message: "Must be 5 or more characters long" }),
});
  
type FormFields = z.infer<typeof docSchema>;



const { width, height } = Dimensions.get('screen');

const DocumentUpload = () => {
    const [gId, setGId] = useState<string | null>(null);
    const [addPf, setAddPf] = useState<string | null>(null);

    const {user, setUser, cardDetails} = UserAuth();
    // console.warn("user", user)
    // console.warn("card", cardDetails)

    const pickGid = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setGId(result.assets[0].uri);
          setUser({ ...user, gId: result.assets[0].uri})
        }
    };
    
    const pickAddPf = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setAddPf(result.assets[0].uri);
          setUser({ ...user, addPf: result.assets[0].uri})
        }
    };

    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
    resolver: zodResolver(docSchema),
    });


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        console.warn("user", user)
        console.warn("card", cardDetails)

        setUser({ ...user, ssn: data.socialSecurityNumber})

        router.push("/(auth)/createPassword")
    };


  return (
    <Background>
        <StatusBar barStyle="light-content" />

        <SafeAreaView>
            <ScrollView>
                <View style={authCommonstyles?.container}>
                

                <View style={styles?.cardContainer}>
                    {/* <Link href={"/(auth)/createPassword"}><Text style={authCommonstyles?.logo}>Logo Here</Text></Link> */}
                    <View style={{backgroundColor: COLORS?.primary}}>
                      <Image source={ require("../../../assets/images/logo.png")} />


                    </View>

                    <Text style={{color: Colors?.base?.primary, fontSize: SIZES?.large, marginBottom: 20, marginTop: 5}}> ID Documents Upload </Text>

                    <Text style={{marginBottom: 20, textAlign: "center"}}> Please ensure all details are correct </Text>

                    <View style={{width: "100%"}}>
                        <Text style={authCommonstyles?.label}>Social security number</Text>
                        {/* <FormInput
                            labelName='Enter your ssn'
                            value={ssn}
                            autoCapitalize='none'
                            onChangeText={(text : string) => setSsn(text)}
                        /> */}
                        <ReuseInput
                            control={control}
                            name={'socialSecurityNumber'}
                            placeholder='Enter your ssn'
                        />

                        <Text style={authCommonstyles?.label}>Driving license or Government ID *</Text>
                        <Pressable onPress={pickGid} >
                            {
                                gId ? 
                                <Image source={{uri: gId}} style={styles?.img} /> :
                                <Image source={ require("../../../assets/images/fileUploads.jpg")} style={styles?.img} />
                            }
                        </Pressable>
                        {/* <Pressable onPress={pickImage} ><Image source={{uri: "../../../assets/images/fileUploads.jpg"}} style={styles?.img} /></Pressable> */}

                        <Text style={authCommonstyles?.label}>Address Verification Document * (utility bill phone bill etc)</Text>
                        <Pressable onPress={pickAddPf} >
                            {
                                addPf ? 
                                <Image source={{uri: addPf}} style={styles?.img} /> :
                                <Image source={ require("../../../assets/images/fileUploads.jpg")} style={styles?.img} />
                            }
                        </Pressable>


                    </View>

                    <View style={{width: "100%"}}>
                        {/* <Button text='Continue'><Link href={"/(auth)/documentUpload"}> </Link> </Button> */}
                        {/* <TouchBtn text='Continue' onPress={() => router.push("/(auth)/createPassword")} /> */}
                        <TouchBtn text={isSubmitting ? 'Submitting...' : 'Continue'} onPress={handleSubmit(onSubmit)} />



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
            </ScrollView>

        </SafeAreaView>
    </Background>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS?.grayBg,
        // height: 300,
        // width: "100%",
        width: width / 1.1,
        // flex: 1,
        alignItems: "center",
        padding: 20,
        marginVertical: 60
       
        // justifyContent: "center"
    },
    img: {
        width: "auto",
        height: width / 2,
        marginTop: 10,
        marginBottom: 20,
        resizeMode: "cover"
    }
})
export default DocumentUpload
