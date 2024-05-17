import Background from '@/components/BackgroundImage'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import { Link, router } from 'expo-router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Alert, Dimensions, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, MD2Colors, TextInput } from 'react-native-paper'
import { Title } from 'react-native-paper';
import FormInput from "@components/FormInput";
import FormButton from '@components/FormButton';
import { COLORS, SIZES } from '@/constants'
import TouchBtn from '@/components/TouchBtn'
import { useAppSelector } from '@/store/hooks'
import { UserAuth } from '@/hooks/useAuthContext'
import { BASE_URL } from '../libs'
import axios from 'axios'
import { toast } from '@backpackapp-io/react-native-toast'
import { Image } from 'react-native'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import ReuseInput from '@/components/ReuseInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyboardAvoidingView } from 'react-native'

const { width, height } = Dimensions.get('screen');

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, { message: "password must be 5 or more characters long" }),
});
  
type FormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // REDUX
    // const { value } = useAppSelector((state) => state.counter)

    // CONTEXT API
    const { userAuthData, setUserAuthData } = UserAuth()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset
    } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(loginFormSchema),
    });
    

    // console.log("email", email)
    // console.log("password", password)

    useLayoutEffect(() => {
        if(userAuthData) {
            router.push("/(drawer)/")
        }
    }, [userAuthData])

    // console.log("authData", userAuthData)

    const handleLogin = async () => {

        if(!email || !password) {
            Alert.alert("Error", "All credentials are compulsory")

            // alert("All credentials are compulsory")
            return
        }
        
        // console.log("data", data)
        const formData = new FormData();
        
        formData.append("email", email);
        formData.append("password", password);

        // console.log("formData", formData)
        // console.log("FormData contents:");
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": " + pair[1]);
        // }

        const loginCred = {
            email: email,
            password: password,
        }

        try {
            // toast.loading('Loading...')
            setIsLoading(true)
            const toastId = toast.loading('Logging You In! Please Wait');

             const response = await axios.post(`${BASE_URL}/auth/signin`, loginCred, {
                // headers: {
                //     'Content-Type': 'application/json',
                // }
            })
            // console.log("response", response.data)
            

            
            // Object.keys(response.data).length

            // const json = await response.text()

            if (response.status === 200 ) {
                toast.success("Log In Successful", { id: toastId });
                // alert("hello")
                setUserAuthData(response.data)
                // navigate("/dashboard");
                router.push("/(drawer)/")

                // console.log("json response",  )

            } else {
                toast.remove()
                setIsLoading(false)
                toast.error("Something went wrong")
            }
        } catch (error: any) {
            toast.remove()
            // setIsLoading(false)
            if (error.message === 'Failed to fetch') toast.error('Network Error. Try again')
            else toast.error('Error encountered. Try again')
            console.log(error.message)
            // Alert.alert("Error", `${error.message}`)
            Alert.alert("Error", `Something went wrong`)
        }

        

        // reset()
        // Add your form submission logic here
    };

    const OnSubmit: SubmitHandler<FormValues> = async (data) => {
        console.log(data)
        const toastId = toast.loading("Sending Your Message");

        // const formData = new FormData()
        // formData.append("email", data.email)
        // formData.append("password", data.password)

        const loginCred = {
            email: data.email,
            password: data.password,
        }
        
    
        try {        
            const response = await axios.post(`${BASE_URL}/auth/signin`, loginCred, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        
            // console.log("response", response.data);
            
            if (response.status === 200 ) {
                toast.success("Log In Successful", { id: toastId });
                // alert("hello")
                setUserAuthData(response.data)
                // navigate("/dashboard");
                router.push("/(drawer)/")

                // console.log("json response",  )

            } else {
                toast.remove()
                setIsLoading(false)
                toast.error("Something went wrong")
            }
        } catch (error: any) {
            toast.remove()
            setIsLoading(false)
            if (error.message === 'Failed to fetch') toast.error('Network Error. Try again')
            else toast.error('Error encountered. Try again')
            console.log(error.message)
            // Alert.alert("Error", `${error.message}`)
            Alert.alert("Error", `Something went wrong`)
        }
        // reset();
    
    }

    // if (userAuthData === null) {
    //     // return <Navigate to='/dashboard' />;
    //     // router.push("/(drawer)/")
    //     return <Text>Loading...</Text>
    // }

    // if(userAuthData) {
    //     router.push("/(drawer)/")
    // }


  return (
    <Background>
        <StatusBar barStyle="light-content" />

        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView contentContainerStyle={authCommonstyles?.container}>
                    

                    <ScrollView contentContainerStyle={authCommonstyles?.cardContainer}>
                        {/* <Link href={"/(auth)/createPassword"}><Text style={authCommonstyles?.logo}>Logo Here</Text></Link> */}
                        <View style={{backgroundColor: COLORS?.primary, width: "auto"}}>
                            <Image source={ require("../../../assets/images/logo.png")}/>


                        </View>

                        {/* <Text className='text-blue-800 text-lg hidde'>Hello</Text> */}
                        {/* <Text className='text-blue-800 text-lg hidde'>{value}</Text> */}

                        <Text style={{color: Colors?.base?.primary, fontSize: SIZES?.large, marginBottom: 20, marginTop: 5}}>Log In</Text>

                        <Text style={{marginBottom: 20, textAlign: "center"}}>Don’t have an account? <Link href={"/(auth)/register"} style={{color: Colors?.base?.primary}}>Create an Account</Link></Text>

                        <View style={{width: "100%"}}>
                            {/* <FormInput
                                labelName='Email'
                                value={email}
                                autoCapitalize='none'
                                onChangeText={(userEmail : string) => setEmail(userEmail)}
                                right={
                                    <TextInput.Icon
                                    icon="email-open-outline"
                                    color={"#000"}
                                    />
                                }
                            /> */}
                            <Text style={authCommonstyles?.label}>Email</Text>
                            <ReuseInput
                                control={control}
                                name={'email'}
                                placeholder='enter email'
                                left={
                                    <TextInput.Icon
                                    icon="email-open-outline"
                                    color={"#000"}
                                    />
                                }
                            />

                            {/* <FormInput
                                labelName='password'
                                value={password}
                                secureTextEntry={ showPassword ? false : true}
                                onChangeText={(userPassword: string) => setPassword(userPassword)}
                                right={
                                    <TextInput.Icon 
                                    icon={ showPassword ? "eye" : "eye-off-outline"}
                                        color={"#000"}
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                }
                            /> */}
                            <Text style={authCommonstyles?.label}>Password</Text>

                            <ReuseInput
                                control={control}
                                name={'password'}
                                placeholder='enter password'
                                // placeholderTextColor='#000'
                                secureTextEntry={ showPassword ? false : true}
                                right={
                                    <TextInput.Icon
                                        icon={ showPassword ? "eye" : "eye-off-outline"}
                                        color={"#000"}
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                }
                                left={
                                    <TextInput.Icon
                                    icon="lock"
                                    // size={6}
                                    color={"#000"}
                                    />
                                }
                            />
                        </View>

                        <Link href={"/(auth)/forgetPassword"} style={{color: COLORS?.primary, alignSelf: "flex-end", fontSize: SIZES?.small}}>Forget Your Password?</Link>

                        <View style={{width: "100%"}}>
                            {/* <Button text='Log In' onPress={() => router.push("/(auth)")}> </Button> */}
                            {/* <TouchBtn text='Continue' onPress={() => router.push("/(drawer)/")} /> */}
                            <TouchBtn text={isSubmitting ? 'Processing...' : 'Continue'} onPress={handleSubmit(OnSubmit)} />
                            {/* <TouchBtn text={isLoading ? 'Processing...' : 'Continue'} onPress={handleLogin} /> */}



                        </View>
                        


                    {/* <Link href="/(auth)/signUp">Go Modal</Link> */}
                    {/* <Link href="/modal">Go Modal</Link> */}
                    </ScrollView>

                    {/* <View className="flex-1 items-center text-red-600 justify-center bg-white">
                        <Text>Open up App.js to start working on your app!</Text>
                        <StatusBar style="auto" />
                    </View> */}

                    {/* <ActivityIndicator size={'large'} animating={true} color={MD2Colors.red800} /> */}

                </ScrollView>

            </KeyboardAvoidingView>

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

export default Login
