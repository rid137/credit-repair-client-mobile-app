import Background from '@/components/BackgroundImage'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { pickerSelectStyles } from './register'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'react-native'
import { UserAuth } from '@/hooks/useAuthContext'
import ReuseInput from '@/components/ReuseInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@backpackapp-io/react-native-toast'
import axios from 'axios'
import { BASE_URL } from '../libs'


const registerSchema = z.object({
  cardNumber: z.string().min(10, { message: "Please provide a valid card number" }),
  cardName: z.string(),
  cvc: z.string().length(3, {message: "Please provide a valid cvv" }),
  expiryDate: z.string().refine((value) => {
      // Use a regular expression to validate the "mm/yy" format
      const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      return regex.test(value);
    }, {
      message: 'Invalid card expiry date format. Use "mm/yy".',
  }),
  
  

});

type FormFields = z.infer<typeof registerSchema>;


const { width, height } = Dimensions.get('screen');
const data = [
    { label: 'normal', value: '1' },
    { label: 'weekly', value: '2' },
    { label: 'monthly', value: '3' },
    
  ];

const PaymentDetails = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [ language, setLanguage ] = useState("");

  const [monthChecked, setMonthChecked] = useState(false);
  const [, setMonthInputValue] = useState('');

  const [annualChecked, setAnnualChecked] = useState(false);
  const [, setAnnualInputValue] = useState('');

  const [lifetimeChecked, setLifetimeChecked] = useState(false);
  const [, setLifetimeInputValue] = useState('');

  const [checked, setChecked] = React.useState(false);

  const [couponCode, setCouponCode] = useState("")

  const [subType, setSuptype] = useState("")

  const { user, setUser, cardDetails, setCardDetails } = UserAuth();



  const handleMonthClick = () => {
    setMonthChecked(true);
    setMonthInputValue("MONTHLY")
    setSuptype("MONTHLY")
  }

  const handleAnnualClick = () => {
    setAnnualChecked(true);
    setAnnualInputValue("ANNUAL")
    setSuptype("ANNUAL")
  }

  const handleLifetimeClick = () => {
    setLifetimeChecked(true);
    setLifetimeInputValue("LIFETIME")
    setSuptype("LIFETIME")
  }


  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  console.log("payment user", user)

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
        
        </Text>
      );
    }
    return null;
  };

  const renderDropDown = () => {
    return(
        <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
      </View>
    )
  }



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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    console.warn(data);
    console.warn(couponCode);
    console.warn(subType);
    // if(!isCheckedMonthlyInput && !isCheckedYearlyInput && !isCheckedLifeTimeInput && !isCheckedSnapshotInput) {
    //     toast.error("You have to subscribe to a plan")
    //     return
    // }

    setCardDetails({...cardDetails, cardName: data.cardName, cardNumber: data.cardNumber, cvv: data.cvc, expiryDate: data.expiryDate, isPrimary: true  })

    const formData = new FormData();
    
    formData.append('cardName', data.cardName);
    formData.append('cardNumber', data.cardNumber);
    formData.append('cardCvv', data.cvc);
    formData.append('expiryDate', data.expiryDate);
    formData.append('email', user?.email as string);
    formData.append('subscriptionType', subType);
    // formData.append('spreadType', spreadType.toUpperCase());
    formData.append('couponCode', couponCode);

    router.push("/(auth)/documentUpload")

    // console.log("FormData contents:");
    // for (let pair of formData?.entries()) {
    //     console.log(pair[0] + ": " + pair[1]);
    // }
    
    // const toastId = toast.loading("Submitting Card Details");
    
    
    // try {        
    //     const response = await axios.post(`${BASE_URL}/payment/payOnRegister`, formData, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
        
    //     console.log("response", response);
        
    //     if (response.status === 200) {
    //         setUser({ ...user, transactionId: response?.data?.transactionId })
    //         // toast.success(response?.data?.message, { id: toastId });
    //         toast.success(response?.data?.message, {
    //             id: toastId,
    //             style: {
    //               color: response?.data?.message === 'Payment success.' ? 'green' : 'red',
    //             },
    //         });

    //         if(response?.data?.success) {
    //             navigate("/document_upload");
    //         }
              
    //     } else {
    //         toast.remove();
    //         toast.error(response.data.message);
    //     }
    // } catch (error: any) {
    //     toast.remove();
    //     if (error.message === 'Failed to fetch') {
    //         toast.error('Network Error. Try again');
    //     } else {
    //         toast.error('Error encountered. Try again');
    //     }
    //     // console.log(error.message);
    // }
};


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

                    <Text style={{color: Colors?.base?.primary, fontSize: SIZES?.large, marginBottom: 20, marginTop: 5}}>Payment Details</Text>

                    <Text style={{marginBottom: 20, textAlign: "center"}}>Please ensure all details are correct</Text>

                    <View style={styles?.inputWrapper}>
                      <View style={styles?.inputContainer}>
                          <Text style={authCommonstyles?.label}>First Name</Text>
                          <TextInput
                            disabled
                            style={styles.input}
                            numberOfLines={1}
                            value={user?.firstName}
                            textColor='#000'                            
                          />
                          {/* <ReuseInput
                            control={control}
                            name={'state'}
                            placeholder='enter state'
                          /> */}
                      </View>

                      <View style={styles?.inputContainer}>
                          <Text style={authCommonstyles?.label}>Middle Name</Text>
                          <TextInput
                            disabled
                            style={styles.input}
                            numberOfLines={1}
                            value={user?.middleName}
                            textColor='#000'                            
                          />
                      </View>
                    </View>

                    <View style={styles?.inputWrapper}>

                      <View style={styles?.inputContainer}>
                          <Text style={authCommonstyles?.label}>Last Name</Text>
                          <TextInput
                            disabled
                            style={styles.input}
                            numberOfLines={1}
                            value={user?.lastName}
                            textColor='#000'                            
                          />
                      </View>

                      <View style={styles?.inputContainer}>
                          <Text style={authCommonstyles?.label}>Phone Number</Text>
                          <TextInput
                            disabled
                            style={styles.input}
                            numberOfLines={1}
                            value={user?.phoneNumber}
                            textColor='#000'                            
                          />
                      </View>


                    </View>

                    <View style={styles?.inputWrapper}>
                      <View style={{width: "100%"}}>
                          <Text style={authCommonstyles?.label}>Email Address</Text>
                          <TextInput
                            disabled
                            style={styles.input}
                            numberOfLines={1}
                            value={user?.email}
                            textColor='#000'                            
                          />
                      </View>

                    </View>


                    <ScrollView horizontal>
                      <View style={{width: "100%", marginBottom: 20, borderColor: COLORS?.inputBg, borderTopWidth: 2, marginTop: 10, borderBottomWidth: 2, paddingBottom: 10}}>
                          {/* FIRST ROW */}
                          <View style={styles?.optionContainer}>
                              <View style={styles?.firstContentContainer} >
                                {/* <View style={{width: 4}}> */}
                                  <Checkbox.Android
                                    status={monthChecked ? 'checked' : 'unchecked'}
                                    onPress={handleMonthClick}
                                    color={COLORS?.primary}
                                    uncheckedColor={COLORS?.primary}
                                  />
                                {/* </View> */}

                                <Text style={styles?.optionText}>Monthly Credit Disputing</Text>
                              </View>

                              <View>
                                  <Text style={styles?.optionText}>Per month : $0</Text>
                              </View>

                              <View>
                                  <Text style={styles?.optionText}>x $0</Text>
                              </View>

                          </View>


                          {/* SECOND ROW */}
                          <View style={styles?.optionContainer}>
                              <View style={styles?.firstContentContainer} >
                                {/* <View style={{width: 4}}> */}
                                <Checkbox.Android
                                    status={annualChecked ? 'checked' : 'unchecked'}
                                    onPress={handleAnnualClick}
                                    color={COLORS?.primary}
                                    uncheckedColor={COLORS?.primary}
                                  />
                                {/* </View> */}

                                <Text style={styles?.optionText}>Annual Credit Disputing</Text>
                              </View>

                              <View>
                                  <Text style={styles?.optionText}>Per year : $130</Text>
                              </View>

                              <View>
                                  <Text style={styles?.optionText}>x $130</Text>
                              </View>

                          </View>

                          {/* THIRD ROW */}
                          <View style={styles?.optionContainer}>
                            <View style={styles?.firstContentContainer} >
                              {/* <View style={{width: 4}}> */}
                                <Checkbox.Android
                                  status={lifetimeChecked ? 'checked' : 'unchecked'}
                                  onPress={handleLifetimeClick}
                                  color={COLORS?.primary}
                                  uncheckedColor={COLORS?.primary}
                                />
                              {/* </View> */}

                              <Text style={styles?.optionText}>Lifetime Credit Disputing</Text>
                            </View>

                            <View>
                              <Text style={styles?.optionText}>Only Once : $1500</Text>
                            </View>

                            <View>
                              <Text style={styles?.optionText}>x $1500</Text>
                            </View>

                          </View>


                          {/* FOURTH ROW */}
                          <View style={styles?.optionContainer}>
                            <View style={styles?.firstContentContainer} >
                              <Checkbox.Android
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                                color={COLORS?.primary}
                                uncheckedColor={COLORS?.primary}
                              />

                              <Text style={styles?.optionText}>Snapshot Credit Disputing</Text>
                            </View>
                            <View>{renderDropDown()}</View>

                            <View>
                              <Text style={styles?.optionText}>1 x $10000</Text>
                            </View>

                          </View>
                      </View>
                    </ScrollView>


                    <View>
                        {/* BOTTOM FIRST ROW */}
                        <View style={styles?.inputWrapper}>
                            <View style={styles?.inputContainer}>
                              <Text style={authCommonstyles?.label}>Credit / Debit Card Number *</Text>
                              {/* <TextInput
                                label="Enter your card number"
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
                                name={'cardNumber'}
                                placeholder='enter cardNumber'
                              />
                            </View>

                            <View style={styles?.inputContainer}>
                                <Text style={authCommonstyles?.label}>Credit / Debit Card Name *</Text>
                                {/* <TextInput
                                    label="Enter your card name"
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
                                  name={'cardName'}
                                  placeholder='enter cardName'
                                />
                            </View>
                        </View>

                        {/* BOTTOM SECOND ROW */}
                        <View style={styles?.inputWrapper}>
                            <View style={styles?.inputContainer}>
                                <Text style={authCommonstyles?.label}>Exp date *</Text>
                                {/* <TextInput
                                  label="mm/yy"
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
                                  name={'expiryDate'}
                                  placeholder='mm/yy'
                                />
                            </View>

                            <View style={styles?.inputContainer}>
                                <Text style={authCommonstyles?.label}>CVC *</Text>
                                {/* <TextInput
                                  label="Enter cvv"
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
                                  name={'cvc'}
                                  placeholder='enter cvc'
                                />
                            </View>
                        </View>

                        {/* BOTTOM THIRD ROW */}
                        <View style={styles?.inputWrapper}>
                            <View style={styles?.inputContainer}>
                              <Text style={authCommonstyles?.label}>Coupon</Text>
                              <TextInput
                                label="enter code"
                                style={styles.input}
                                numberOfLines={1}
                                // outlined= {"disabled"}
                                mode="outlined"
                                outlineColor={COLORS?.primary}
                                activeOutlineColor={COLORS?.primary}
                                textColor='#000'
                                value={couponCode}
                                onChangeText={text => setCouponCode(text)}
                                // cursorColor='#000'
                              />
                            </View>

                            <View style={styles?.inputContainer}>
                              {/* <TouchBtn text='Apply' onPress={() => console.warn("hello")} /> */}
                              <TouchableOpacity style={{backgroundColor: COLORS?.primary, borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{textAlign: "center", color: "#fff", borderRadius: 10, paddingVertical: 2}}>Apply</Text>
                              </TouchableOpacity>
                            </View>
                        </View>


                    </View>

              <View style={{width: "100%"}}>
                <TouchBtn text='Continue' onPress={() => router.push("/(auth)/documentUpload")} />
                {/* <TouchBtn text={isSubmitting ? 'Submitting...' : 'Continue'} onPress={handleSubmit(onSubmit)} /> */}
              </View>

            </View>

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
      justifyContent: "center",
      alignItems: "center"
    },
    inputContainer: {
      width: "50%", 
    },
    input: {
      fontSize: 14,
        marginTop: 5,
        marginBottom: 14,
        height: 35,
        //   width: width / 4.3,
        //   height: height / 15,
        // width: "100%",
        backgroundColor: COLORS?.inputBg,
        color: "#000",

        
        // borderRadius: 20,
        
    },
    optionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 30
    },
    firstContentContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    optionText: {
        fontSize: SIZES?.small
    },

    container: {
        backgroundColor: 'white',
        // padding: 16,
      },
      dropdown: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 30,
      },
      icon: {
        marginRight: 10,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 1,
      },
      placeholderStyle: {
        fontSize: 12,
      },
      selectedTextStyle: {
        fontSize: 12,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
  });

export default PaymentDetails
