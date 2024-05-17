import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { authCommonstyles } from '../(auth)'
import { TextInput } from 'react-native-paper'
import { COLORS } from '@/constants'
import TouchBtn from '@/components/TouchBtn'
import { router } from 'expo-router'
import BigTitle from '@/components/BigTitle'
import { UserAuth } from '@/hooks/useAuthContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from '@backpackapp-io/react-native-toast'
import axios from 'axios'
import { BASE_URL } from '../libs'
import ReuseInput from '@/components/ReuseInput'
import { z } from 'zod'


const supportFormSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  message: z.string(),
});

type FormValues = z.infer<typeof supportFormSchema>;

const Help = () => {

  const { userAuthData } = UserAuth();
    const accessToken = userAuthData?.token;
    const id = userAuthData?.userId;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset
      } = useForm<FormValues>();
    
      
      const OnSubmit: SubmitHandler<FormValues> = async (data) => {
        // console.log(data)
        const toastId = toast.loading("Sending Your Message");

        const formData = new FormData()
        formData.append("fullName", data.fullName)
        formData.append("email", data.email)
        formData.append("message", data.message)
    
        try {        
            const response = await axios.post(`${BASE_URL}/support/save/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        
            // console.log("response", response.data);
            
            if (response.status === 200) {
                toast.success(response?.data, { id: toastId });
                Alert.alert("Success", `Message sent successfully`)
            } else {
                toast.remove();
                toast.error(response.data.message);
            }
        } catch (error: any) {
            toast.remove();
            if (error.message === 'Failed to fetch') {
                toast.error('Network Error. Try again');
            } else {
                toast.error('Error encountered. Try again');
            };
            console.log(error.message);
            Alert.alert("Error", `Something went wrong`)
        };
        reset();
    
      }

  return (
    <ScrollView style={{flex: 1, paddingHorizontal: 15, marginTop: 15}}>
      <Text style={{fontWeight: "bold", marginBottom: 10, }}>Welcome to Wolfgang Stuant Help & Support</Text>
      {/* <BigTitle text='Welcome to Wolfgang Stuant Help & Support' /> */}
      <Text>At Wolfgang Stuant, we are dedicated to delivering top-notch products/services and providing excellent customer support. Our Help & Support resources are designed to assist you in finding solutions to your questions, addressing issues, and ensuring a seamless experience with us.</Text>

      <Text style={{fontWeight: "bold", marginVertical: 10}}>Contact Us</Text>
      <Text>Contact Us Our dedicated support team is ready to assist you. Choose your preferred contact</Text>

      <View style={{flexDirection: "row", alignItems: "flex-start", gap: 6, marginTop: 10}}>
        <Text style={{fontWeight: "bold", fontSize: 16}}>.</Text>
        <Text>Address: 35, Afolabi Awosanya Street, Ikeja, Lagos</Text>
        

      </View>

      <View style={{flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10}}>
        <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 10}}>.</Text>
        <Text>Email Address: support@companyname.com</Text>
        

      </View>

      <View style={{flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10}}>
        <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 10}}>.</Text>
        <Text>Phone Number: +234 901 259 8745</Text>
        

      </View>

      {/* HELP FORM */}
      <View style={{width: "100%"}}>
        <Text style={authCommonstyles?.label}>Full Name</Text>
        {/* <TextInput
          // label="Enter details"
          style={styles.input}
          numberOfLines={1}
          // outlined= {"disabled"}
          mode="outlined"
          placeholder='Dianne Russell'
          outlineColor={COLORS?.primary}
          activeOutlineColor={COLORS?.primary}
          textColor='#000'
        /> */}
        <ReuseInput
          control={control}
          name={'fullname'}
          placeholder='enter fullname'
        />

        <Text style={authCommonstyles?.label}>Email Address</Text>
          {/* <TextInput
            // label="Enter details"
            style={styles.input}
            numberOfLines={1}
            // outlined= {"disabled"}
            mode="outlined"
            placeholder='Russell7896@gmail.com'
            outlineColor={COLORS?.primary}
            activeOutlineColor={COLORS?.primary}
            textColor='#000'
          /> */}
          <ReuseInput
            control={control}
            name={'email'}
            placeholder='example@gmail.com'
          />

        </View>

        <Text style={authCommonstyles?.label}>Message</Text>
        <View style={styles.textAreaContainer} >
          {/* <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Type something"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          /> */}
          <ReuseInput
            control={control}
            name={'message'}
            // cls={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Type something"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
            textArea
          />
        </View>

        <View style={{width: "100%"}}>
          <TouchBtn text={isSubmitting ? "Submitting..." : 'Send Message'} onPress={handleSubmit(OnSubmit)} />
        </View>

    </ScrollView>
  )
}

export default Help

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
      marginTop: 5,
      marginBottom: 14,
      height: 35,
      backgroundColor: COLORS?.inputBg,
      color: "#000",
  },
  textAreaContainer: {
    // borderColor: COLORS?.inputBg,
    borderWidth: 1,
    borderColor: COLORS?.primary,
    marginTop: 6
    // padding: 5
  },
  textArea: {
    // height: 150,
    // justifyContent: "flex-start"
    backgroundColor: COLORS?.inputBg,
  }
})