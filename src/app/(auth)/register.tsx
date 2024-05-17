import Background from '@/components/BackgroundImage'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Dimensions, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, MD2Colors, TextInput } from 'react-native-paper'
import { Title } from 'react-native-paper';
import FormInput from "@components/FormInput";
import FormButton from '@components/FormButton';
import { COLORS, SIZES } from '@/constants'
import { authCommonstyles } from '.'
import DateTimePicker from 'react-native-modal-datetime-picker'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import RNPickerSelect from "react-native-picker-select";
import { Checkbox } from 'react-native-paper';
import TouchBtn from '@/components/TouchBtn'
import { Image } from 'react-native'
import { PaperSelect } from 'react-native-paper-select'
import Dropdown from 'react-native-input-select';
import { z } from 'zod'
import ReuseInput from '@/components/ReuseInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@backpackapp-io/react-native-toast'
import { UserAuth } from '@/hooks/useAuthContext'
import { KeyboardAvoidingView } from 'react-native'




const { width, height } = Dimensions.get('screen');

const registerSchema = z.object({
  firstName: z.string().min(3, { message: "Must be 3 or more characters long" }),
  middleName: z.string().min(3, { message: "Must be 3 or more characters long" }),
  lastName: z.string().min(3, { message: "Must be 3 or more characters long" }),
  phoneNumber: z.string().min(11, { message: "Must be 11 characters long" }),
  emailAddress: z.string().email(),
  streetAddress: z.string().min(1, { message: "streetAddress is required" }),
  state: z.string().min(1, { message: "state is required" }),
  zipCode: z.string().min(1, { message: "zipCode is required" }),
  // dateOfBirth: z.string().min(1, { message: "date Of Birth is required" }),
  // creditConsultMethod: z.string().min(1, 'select one'),
  // referralSource: z.string().min(1, 'select one'),
});

type FormFields = z.infer<typeof registerSchema>;


const Register = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [ language, setLanguage ] = useState("");
  const [checked, setChecked] = React.useState(false);

  const [creditConsultMethod, setCreditConsultMethod] = useState<string | null>(null);
  const [referralSource, setReferralSource] = useState<string | null>(null);

  const [country, setCountry] = React.useState();

  const { user, setUser } = UserAuth();

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: any) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormFields>({
    // defaultValues: {
    //     email: '',
    //     password: '',
    // },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);

    if(!referralSource || !creditConsultMethod) {
      Alert.alert("Error", `All inputs are required`)
      return
    }

    if(!checked) {
      // toast.error("You have to agree with the privacy policy")
      Alert.alert("Error", `You have to agree with the privacy policy`)
      return
    }

    setUser({ ...user, referralMethod: referralSource, consultMethod: creditConsultMethod, streetAddr: data.streetAddress, email: data.emailAddress, firstName: data.firstName, middleName: data.middleName, lastName: data.lastName, phoneNumber: data.phoneNumber, state: data.state, dob: selectedDate, zipCode: data.zipCode })
    // navigate("/payment_details");
    router.push("/(auth)/paymentDetails")
    
    
    // reset()
  };
  console.log("user", user)

  return (
    <Background>
        <StatusBar barStyle="light-content" />

        <SafeAreaView>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView>
            <View style={authCommonstyles?.container}>
                

                <View style={styles?.cardContainer}>
                    {/* <Link href={"/(auth)/createPassword"}><Text style={authCommonstyles?.logo}>Logo Here</Text></Link> */}
                    <View style={{backgroundColor: COLORS?.primary}}>
                      <Image source={ require("../../../assets/images/logo.png")} />


                    </View>

                    <Text style={{color: Colors?.base?.primary, fontSize: SIZES?.large, marginBottom: 20, marginTop: 5}}>Create An Account</Text>

                    <Text style={{marginBottom: 20, textAlign: "center"}}>Already have an account? <Link href={"/(auth)/"} style={{color: Colors?.base?.primary}}>Log In</Link></Text>

                    <View style={styles?.inputWrapper}>
                      <View style={styles?.inputContainer}>
                          <Text style={authCommonstyles?.label}>First Name</Text>
                          {/* <TextInput
                            label="Enter your firstname"
                            style={styles.input}
                            numberOfLines={1}
                            // outlined= {"disabled"}
                            mode="outlined"
                            outlineColor={COLORS?.primary}
                            activeOutlineColor={COLORS?.primary}
                            textColor='#000'
                            // cursorColor='#000'
                            
                          /> */}
                          <ReuseInput
                            control={control}
                            name={'firstName'}
                            placeholder='enter firstname'
                          />
                      </View>

                      <View style={styles?.inputContainer}>
                          <Text style={authCommonstyles?.label}>Middle Name</Text>
                          {/* <TextInput
                            label="Enter your middlename"
                            style={styles.input}
                            numberOfLines={1}
                            // outlined= {"disabled"}
                            mode="outlined"
                            outlineColor={COLORS?.primary}
                            activeOutlineColor={COLORS?.primary}
                            textColor='#000'
                          /> */}
                          <ReuseInput
                            control={control}
                            name={'middleName'}
                            placeholder='enter middlename'
                          />
                      </View>

                      {/* <View style={{width: "30%"}}>
                          <FormInput
                              labelName='Email'
                              value={email}
                              autoCapitalize='none'
                              onChangeText={(userEmail : string) => setEmail(userEmail)}
                          />                        
                      </View> */}


                    </View>

                    <View style={styles?.inputWrapper}>
                      <View style={styles?.inputContainer}>
                          <Text style={authCommonstyles?.label}>Last Name</Text>
                          {/* <TextInput
                            label="Enter your lastname"
                            style={styles.input}
                            numberOfLines={1}
                            // outlined= {"disabled"}
                            mode="outlined"
                            outlineColor={COLORS?.primary}
                            activeOutlineColor={COLORS?.primary}
                            textColor='#000'
                          /> */}
                          <ReuseInput
                            control={control}
                            name={'lastName'}
                            placeholder='enter lastname'
                          />
                      </View>

                      <View style={styles?.inputContainer}>
                          <Text style={authCommonstyles?.label}>Phone Number</Text>
                          {/* <TextInput
                            label="Enter your phoneNumber"
                            style={styles.input}
                            numberOfLines={1}
                            // outlined= {"disabled"}
                            mode="outlined"
                            outlineColor={COLORS?.primary}
                            activeOutlineColor={COLORS?.primary}
                            textColor='#000'
                          /> */}
                          <ReuseInput
                            control={control}
                            name={'phoneNumber'}
                            placeholder='enter phoneNumber'
                          />
                      </View>

                    </View>

                    {/* THIRD ROW */}
                    <View style={styles?.inputWrapper}>
                      <View style={styles?.inputContainer}>
                          <Text style={authCommonstyles?.label}>Email Address</Text>
                          {/* <TextInput
                            label="Enter your email"
                            style={styles.input}
                            numberOfLines={1}
                            // outlined= {"disabled"}
                            mode="outlined"
                            outlineColor={COLORS?.primary}
                            activeOutlineColor={COLORS?.primary}
                            textColor='#000'
                          /> */}
                          <ReuseInput
                            control={control}
                            name={'emailAddress'}
                            placeholder='enter email'
                          />
                      </View>

                      <View style={styles?.inputContainer}>
                        <Text style={authCommonstyles?.label}>state</Text>
                        {/* <TextInput
                          label="Enter details"
                          style={styles.input}
                          numberOfLines={1}
                          // outlined= {"disabled"}
                          mode="outlined"
                          outlineColor={COLORS?.primary}
                          activeOutlineColor={COLORS?.primary}
                          textColor='#000'
                        /> */}
                        <ReuseInput
                          control={control}
                          name={'state'}
                          placeholder='enter state'
                        />
                      </View>

                    </View>

                    {/* FOURTH ROW */}
                    <View style={styles?.inputWrapper}>
                      <View style={{width: "100%"}}>
                        <Text style={authCommonstyles?.label}>Street Address</Text>
                        {/* <TextInput
                          label="Enter details"
                          style={styles.input}
                          numberOfLines={1}
                          // outlined= {"disabled"}
                          mode="outlined"
                          outlineColor={COLORS?.primary}
                          activeOutlineColor={COLORS?.primary}
                          textColor='#000'
                        /> */}
                        <ReuseInput
                          control={control}
                          name={'streetAddress'}
                          placeholder='enter address'
                        />
                      </View>

                    </View>

                    {/* FIFTH ROW */}
                    <View style={styles?.inputWrapper}>
                      <View style={styles?.inputContainer}>
                        <Text style={authCommonstyles?.label}>Zip Code</Text>
                        {/* <TextInput
                          label="Enter your zipcode"
                          style={styles.input}
                          numberOfLines={1}
                          // outlined= {"disabled"}
                          mode="outlined"
                          outlineColor={COLORS?.primary}
                          activeOutlineColor={COLORS?.primary}
                          textColor='#000'
                        /> */}
                        <ReuseInput
                          control={control}
                          name={'zipCode'}
                          placeholder='enter zipCode'
                        />
                      </View>

                      <Pressable style={styles?.inputContainer} onPress={showDatePicker}>
                          <Text style={authCommonstyles?.label}>Date Of Birth</Text>
                          <TextInput
                            // label="Enter details"
                            style={styles.input}
                            numberOfLines={1}
                            // outlined= {"disabled"}
                            mode="outlined"
                            outlineColor={COLORS?.primary}
                            activeOutlineColor={COLORS?.primary}
                            textColor='#000'
                            onFocus={ showDatePicker }
                            // onChange={(txt: any) => setSelectedDate(txt)}
                            value={selectedDate.toLocaleDateString()}
                            readOnly
                            // theme={{ colors: { onSurfaceVariant: 'white'} }}
                            

                          />
                          {/* <ReuseInput
                            control={control}
                            name={'dateOfBirth'}
                            placeholder='enter zipCode'
                          /> */}
                          
                      </Pressable>

                    </View>

                    {/* <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                      {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
                    </Text>
                    <Button text="Select a date" onPress={showDatePicker} /> */}
                    <DateTimePickerModal
                      date={selectedDate}
                      isVisible={datePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />

            <View style={styles?.inputWrapper}>
              <View style={styles?.inputContainer}>
                <Text style={styles?.label}>Referral Source</Text>

                {/* <RNPickerSelect
                    onValueChange={(language) => setLanguage(language)}
                    useNativeAndroidPickerStyle={false}
                    // placeholder={{ label: "select option", value: null }}
                    placeholder={{ label: "select option", value: '' }}
                    
                    items={[
                        { label: "JavaScript", value: "JavaScript" },
                        { label: "TypeScript", value: "TypeScript" },
                        { label: "Python", value: "Python" },
                        { label: "Java", value: "Java" },
                        { label: "C++", value: "C++" },
                        { label: "C", value: "C" },
                    ]}
                  style={pickerSelectStyles}
                /> */}

                {/* <PaperSelect
                  label="Select Gender"
                  value={gender?.value}
                  onSelection={(value: any) => {
                  setGender({
                          ...gender,
                          value: value.text,
                          selectedList: value.selectedList
                      });
                  }}
                  arrayList={[...gender.list]}
                  selectedArrayList={[...gender.selectedList]}
                  multiEnable={false}
                  theme={{
                    colors: {
                      primary: 'black'
                    }
                  }}
                /> */}

              {/* <PaperSelect
                label="Select Gender"
                value={gender.value}
                onSelection={(value: any) => {
                  setGender({
                    ...gender,
                    value: value.text,
                    selectedList: value.selectedList,
                    error: '',
                  });
                }}
                arrayList={[...gender.list]}
                selectedArrayList={gender.selectedList}
                errorText={gender.error}
                multiEnable={false}
                dialogTitleStyle={{ color: 'red' }}
                checkboxColor="yellow"
                checkboxLabelStyle={{ color: 'red', fontWeight: '700' }}
                textInputBackgroundColor="yellow"
                textInputColor="red"
              />; */}


              {/* <PaperSelect
                label="Select Gender"
                value={gender.value}
                onSelection={(value: any) => {
                  setGender({
                    ...gender,
                    value: value.text,
                    selectedList: value.selectedList,
                    error: '',
                  });
                }}
                arrayList={[...gender.list]}
                selectedArrayList={gender.selectedList}
                errorText={gender.error}
                multiEnable={false}
                dialogTitleStyle={{ color: 'white' }}
                textInputStyle={pickerSelectStyles?.inputAndroid}
                
                // containerStyle={{height: 20}}
                // checkboxColor="yellow"
                // checkboxLabelStyle={{ color: 'red', fontWeight: '700' }}
                // textInputBackgroundColor="yellow"
                // textInputColor="red"
                // outlineColor="black"
                theme={{
                  colors: {
                    placeholder: 'white'
                  }
              }}

              /> */}

            <Dropdown
              placeholder="Select option"
              placeholderStyle={{color: "gray"}}
              options={[
                { label: 'Text', value: 'text' },
                { label: 'Email', value: 'email' },
              ]}
              selectedValue={creditConsultMethod}
              onValueChange={(value: string) => setCreditConsultMethod(value)}
              primaryColor={'green'}
              dropdownIconStyle={{ top: 15, right: 20, display: "none" }}
              dropdownStyle={{
                backgroundColor: 'white',
                paddingVertical: 7,
                paddingHorizontal: 5,
                minHeight: 30,
                borderColor: COLORS?.primary,
              }}
            />

            </View>

              <View style={styles?.inputContainer}>
                <Text style={styles?.label}>Credit Consult Method</Text>

                {/* <RNPickerSelect
                  onValueChange={(language) => setLanguage(language)}
                  useNativeAndroidPickerStyle={false}
                  // placeholder={{ label: "select option", value: null }}
                  placeholder={{ label: "select option", value: '' }}
                  items={[
                      { label: "JavaScript", value: "JavaScript" },
                      { label: "TypeScript", value: "TypeScript" },
                      { label: "Python", value: "Python" },
                      { label: "Java", value: "Java" },
                      { label: "C++", value: "C++" },
                      { label: "C", value: "C" },
                  ]}
                style={pickerSelectStyles}
                /> */}

                <Dropdown
                  // label="Country"
                  placeholder="Select option"
                  placeholderStyle={{color: "gray"}}
                  options={[
                    { label: 'Social media', value: 'social media' },
                    { label: 'Friends', value: 'friends' },
                    { label: 'Ads', value: 'ads' },
                  ]}
                  selectedValue={referralSource}
                  onValueChange={(value: string) => setReferralSource(value)}
                  primaryColor={'green'}
                  dropdownIconStyle={{ top: 15, right: 20, display: "none" }}
                  // checkboxLabelStyle={{color: 'green', fontSize: 20}}
                  
                  dropdownStyle={{
                    backgroundColor: 'white',
                    paddingVertical: 7,
                    paddingHorizontal: 5,
                    minHeight: 30,
                    borderColor: COLORS?.primary,
                  }}
                />
              </View>

              </View>

              {/* CHECKBOX */}
              <Pressable onPress={() => {setChecked(!checked)}} style={{flexDirection: "row", marginTop: 10,  alignItems: "center"}}>
                <Checkbox.Android
                  status={checked ? 'checked' : 'unchecked'}
                  color={COLORS?.primary}
                  uncheckedColor={COLORS?.primary}
                />
                <Text style={{fontSize: 12}}>I agree to the terms and conditions provided by the company</Text>
              </Pressable>

              
              <View style={{width: "100%"}}>
                  {/* <Button text='Log In' onPress={() => router.push("/(auth)/paymentDetails")}  /> */}
                  {/* <TouchBtn text={isSubmitting ? 'Submitting...' : 'Continue'} onPress={handleSubmit(onSubmit)} /> */}
                  <TouchBtn text="Continue" onPress={() => router.push("/(auth)/paymentDetails")} />



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
          </KeyboardAvoidingView>


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
    inputWrapper: {
      width: "100%", 
      flexDirection: "row", 
      gap: 7, 
      justifyContent: "center"
    },
    inputContainer: {
      width: "50%", 
    },
    input: {
      fontSize: 14,
        marginTop: 5,
        marginBottom: 14,
        height: 40,
        backgroundColor: COLORS?.inputBg,
        color: "#000",
    },
    label: {
      fontSize: SIZES?.small,
      fontWeight: "bold",
      marginBottom: 5
    }
  });

  export const pickerSelectStyles = StyleSheet.create({
    // inputIOS: {
    //     fontSize: 14,
    //     paddingVertical: 12,
    //     paddingHorizontal: 10,
    //     borderWidth: 1,
    //     borderColor: COLORS?.primary,
    //     borderRadius: 4,
    //     color: 'black',
    //     paddingRight: 30 // to ensure the text is never behind the icon
    // },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        // paddingVertical: "auto",
        minHeight: 20,
        borderWidth: 1,
        borderColor: COLORS?.primary,
        borderRadius: 8,
        color: 'black',
        backgroundColor: "white",
        // height: 30,
        paddingRight: 30, // to ensure the text is never behind the icon
       
    }
});

export default Register


{/* <TextInput
        mode="outlined"
        label="Remitter Mobile Number"
        theme={{ colors: { onSurfaceVariant: 'white'} }}
        style={{ backgroundColor: '#626262' }}
        activeOutlineColor="white"
        placeholder="placeholder"
        outlineColor="white"
        textColor="white"
        onChangeText={(text) => setValue(text)}
        autoCapitalize="none"
        blurOnSubmit={false}
        keyboardType="number-pad"
        returnKeyType="done"
        maxLength={10}
        value={Value}
      /> */}
