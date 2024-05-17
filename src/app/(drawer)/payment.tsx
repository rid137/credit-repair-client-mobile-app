import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SmallTitle from '@/components/SmallTitle'
import { COLORS, SIZES } from '@/constants'
import FormInput from '@/components/FormInput'
import FormButton from '@/components/FormButton'
import { TextInput } from 'react-native-paper'
import { authCommonstyles } from '../(auth)'
import PaymentTable from '@/components/PaymentTable'
import TouchBtn from '@/components/TouchBtn'
import { Link, router } from 'expo-router'
import BigTitle from '@/components/BigTitle'
import { UserAuth } from '@/hooks/useAuthContext'
import axios from 'axios'
import { BASE_URL } from '../libs'
import { clipSentence } from '@/utils/dummy'
import { CardDetailsType, PaymentDataType } from '@/types/clientDetailsObj'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import ReuseInput from '@/components/ReuseInput'
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@backpackapp-io/react-native-toast'


const addCardSchema = z.object({
    cardNumber: z.string().min(10, { message: "Please provide a valid card number" }),
    // cardName: z.string(),
    cvv: z.string().length(3, { message: "Please provide a valid cvv" }),
    expiryDate: z.string().refine((value) => {
        // Use a regular expression to validate the "mm/yy" format
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return regex.test(value);
      }, {
        message: 'Invalid card expiry date format. Use "mm/yy".',
    }),
});

type FormFields = z.infer<typeof addCardSchema>;

const Payment = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [clientCardDetails, setClientCardDetails] = useState<CardDetailsType[] | null>(null)
    const [clientPaymentDetails, setClientPaymentDetails] = useState<PaymentDataType[] | null>(null)

    const { userAuthData  } = UserAuth();
    const [isEditing, setIsEditing] = useState(true);

    const clientId = userAuthData?.userId
    const accessToken = userAuthData?.token

    // console.log("clientcarddetails", clientCardDetails)

    const fetchClientCards = async () => {
        // console.log("id", id)
        try {
          const response = await axios.get(
            `${BASE_URL}/card/getClientCards/${clientId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                // 'Content-Type': 'application/json',
              },
            }
          );
          const allScoresData = response.data;

            // setAllScores(allScoresData)

          return allScoresData;
        } catch (error) {
          console.error('Error fetching all clients:', error);
        }
    };

    const fetchPayments = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/payment/getPayments/${clientId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const clientsData = response.data;

        //   setSingleClient(clientsData);
      
          return clientsData;
        } catch (error) {
          console.error('Error fetching single client:', error);
        }
    };

    const fetchData = async () => {
        try {
          const [ clientCards, paymentData ] = await Promise.all([
            fetchClientCards(),
            fetchPayments(),
          ]);
      
          setClientCardDetails(clientCards);
          setClientPaymentDetails(paymentData);
        } catch (error) {
          console.error('Error fetching all data:', error);
        }
    };
      
    useEffect(() => {
        fetchData();
    }, []);

    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            cardNumber: '',
            cvv: '',
            expiryDate: '',
            },
        resolver: zodResolver(addCardSchema),
    });
      
    // const onSubmit: SubmitHandler<FormFields> = (data)=>{
      
    //   Alert.alert("Successful", JSON.stringify(data))
    // }

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        console.log(data);
        
        const formData = new FormData();
        
        // formData.append('cardName', "Hello");
        formData.append('cardNumber', data.cardNumber);
        formData.append('cvv', data.cvv);
        formData.append('expiryDate', data.expiryDate);

        const toastId = toast.loading("Submitting Card Details");
    
        try {        
            const response = await axios.post(`${BASE_URL}/card/save/${clientId}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            
            console.log("response", response);
            
            if (response.status === 200) {
                toast.success("Card details added successfully", { id: toastId });
                Alert.alert("Success", "Card details added successfully")
                await fetchClientCards()
            } else {
                toast.remove();
                Alert.alert("Info", `${response.data.message}`)
                toast.error(response.data.message);
            }
        } catch (error: any) {
            toast.remove();
            if (error.message === 'Failed to fetch') {
                toast.error('Network Error. Try again');
            } else {
                toast.error('Error encountered. Try again');
            }
            console.log(error);
            Alert.alert("Error", `Something Went Wrong`)
        }

        // reset()
    };


  return (
    <ScrollView contentContainerStyle={{backgroundColor: "#F5F5F5", paddingHorizontal: 15,}}>
            <View style={styles?.cardContainer}>
                {/* FIRST PART */}
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <SmallTitle text="Primary Card Details" />
                    <TouchableOpacity><Text style={{backgroundColor: COLORS?.primary, paddingHorizontal: 10,color: "white", borderRadius: 10, paddingVertical: 4, fontSize: SIZES?.small}}>Edit Card</Text></TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, }}>
                {/* <FormInput
                    labelName='Email'
                    value={email}
                    autoCapitalize='none'
                    onChangeText={(userEmail : string) => setEmail(userEmail)}
                /> */}
                <Text style={authCommonstyles?.label}>Credit / Debit Card Number  <Text style={{color: "red"}}>*</Text></Text>

                {/* isEditing ?
                                        <input  type="text" className="bg-transparent outline-none" defaultValue={clientCards?.data && clipSentence(clientCards?.data[0]?.cardNumber, 4, true )}  />
                                        :
                                        <p>{clientCards && clientCards?.data?.length > 0 && clipSentence(clientCards?.data[0]?.cardNumber, 4, true )}</p> */}

                {
                    isEditing ? 
                        <TextInput
                            // label="**** **** **** 5675"
                            style={styles.input}
                            numberOfLines={1}
                            // outlined= {"disabled"}
                            mode="outlined"
                            outlineColor={COLORS?.primary}
                            activeOutlineColor={COLORS?.primary}
                            textColor='#000'
                            // value={clientCardDetails[0]?.cardNumber}
                            // theme={{ colors: { onSurfaceVariant: 'white'} }}
                            // defaultValue={clientCardDetails && clipSentence(clientCardDetails[0]?.cardNumber, 4, true )}
                            value={clipSentence(clientCardDetails ? clientCardDetails[0]?.cardNumber ?? "" : "", 4, true)}

                            

                        />
                        :
                        <TextInput
                            label="**** **** **** 5675"
                            style={styles.input}
                            numberOfLines={1}
                            // outlined= {"disabled"}
                            mode="outlined"
                            outlineColor={COLORS?.primary}
                            activeOutlineColor={COLORS?.primary}
                            textColor='#000'
                            value={clipSentence(clientCardDetails ? clientCardDetails[0]?.cardNumber ?? "" : "", 4, true)}
                            // theme={{ colors: { onSurfaceVariant: 'white'} }}
                            
                        />
                }
                </View>

                {/* {
                                            isEditing ? 
                                            <input  type="text" className=" outline-none  p-3 rounded-md" defaultValue={clientCards?.data && clientCards?.data[0]?.expiryDate} />
                                            :
                                            // <p>{clientCards && clientCards[0]?.expiryDate}</p>
                                            
                                            <input type="text" className=" outline-none  p-3 rounded-md" value={clientCards?.data && clientCards?.data[0]?.expiryDate} />
                                        } */}

                    <View style={styles?.inputWrapper}>
                        <View style={styles?.inputContainer}>
                            <Text style={authCommonstyles?.label}>Expiration Date <Text style={{color: "red"}}>*</Text></Text>
                            {
                                isEditing ? 
                                    <TextInput
                                    // label="12/23"
                                    style={styles.input}
                                    numberOfLines={1}
                                    // outlined= {"disabled"}
                                    mode="outlined"
                                    outlineColor={COLORS?.primary}
                                    activeOutlineColor={COLORS?.primary}
                                    textColor='#000'
                                    value={clientCardDetails ? clientCardDetails[0]?.expiryDate : "dd/mm"}

                                    // cursorColor='#000'
                                    
                                />
                            :
                            <TextInput
                                label="12/23"
                                style={styles.input}
                                numberOfLines={1}
                                // outlined= {"disabled"}
                                mode="outlined"
                                outlineColor={COLORS?.primary}
                                activeOutlineColor={COLORS?.primary}
                                textColor='#000'
                                // cursorColor='#000'
                                
                            />
                            }
                        </View>

                        <View style={styles?.inputContainer}>
                            <Text style={authCommonstyles?.label}>Cvv <Text style={{color: "red"}}>*</Text></Text>
                            {
                                isEditing ? 
                                    <TextInput
                                        // label="***"
                                        style={styles.input}
                                        numberOfLines={1}
                                        // outlined= {"disabled"}
                                        mode="outlined"
                                        outlineColor={COLORS?.primary}
                                        activeOutlineColor={COLORS?.primary}
                                        textColor='#000'
                                        value={clientCardDetails ? clientCardDetails[0]?.cvv : "***"}
                                    /> 
                                    :
                                    <TextInput
                                        label="***"
                                        style={styles.input}
                                        numberOfLines={1}
                                        // outlined= {"disabled"}
                                        mode="outlined"
                                        outlineColor={COLORS?.primary}
                                        activeOutlineColor={COLORS?.primary}
                                        textColor='#000'
                                    />
                            }
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
                {/* <FormButton
                    title='Login'
                    modeValue='contained'
                    labelStyle={styles.loginButtonLabel}
                />
                <FormButton
                    title='New user? Join here'
                    modeValue='text'
                    uppercase={false}
                    labelStyle={styles.navButtonText}
                /> */}

                
            </View>


            {/* SECOND PART */}
            <View style={styles?.cardContainer}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <SmallTitle text="Secondary Card Details" />
                    <TouchableOpacity><Text onPress={handleSubmit(onSubmit)} style={{backgroundColor: COLORS?.primary, paddingHorizontal: 10,color: "white", borderRadius: 10, paddingVertical: 4, fontSize: SIZES?.small}}>{ isSubmitting ? "Submitting..." : "Add Card"}</Text></TouchableOpacity>
                </View>

                <View style={{ marginTop: 20, }}>
                    <Text style={authCommonstyles?.label}>Credit / Debit Card Number  <Text style={{color: "red"}}>*</Text></Text>
                    {/* <TextInput
                        label="**** **** **** 5675"
                        style={styles.input}
                        numberOfLines={1}
                        mode="outlined"
                        outlineColor={COLORS?.primary}
                        activeOutlineColor={COLORS?.primary}
                        textColor='#000'
                    /> */}
                    {/* <Controller
                        control={control}
                        name={'cardNumber'}
                        render={({ field: { value, onChange, onBlur }})=>(
                        <TextInput
                            placeholder='email'
                            style={styles.input}
                            textColor='#000'
                            value={value}
                            onChangeText={onChange}
                            outlineColor={COLORS?.primary}
                            activeOutlineColor={COLORS?.primary}
                            numberOfLines={1}
                            mode="outlined"
                            onBlur={onBlur}
                        />
                        )}
                    /> */}

                    <ReuseInput
                        control={control}
                        name={'cardNumber'}
                        placeholder='**** **** **** ****'
                    />
                </View>

                <View style={styles?.inputWrapper}>
                    <View style={styles?.inputContainer}>
                        <Text style={authCommonstyles?.label}>Expiration Date <Text style={{color: "red"}}>*</Text></Text>
                        {/* <TextInput
                            label="mm/yy"
                            style={styles.input}
                            numberOfLines={1}
                            mode="outlined"
                            outlineColor={COLORS?.primary}
                            activeOutlineColor={COLORS?.primary}
                            textColor='#000'
                        /> */}
                        {/* <Controller
                            control={control}
                            name={'expiryDate'}
                            render={({ field: { value, onChange, onBlur }})=>(
                            <TextInput
                                placeholder='fullname'
                                style={styles.input}
                                textColor='#000'
                                value={value}
                                onChangeText={onChange}
                                outlineColor={COLORS?.primary}
                                activeOutlineColor={COLORS?.primary}
                                numberOfLines={1}
                                mode="outlined"
                                onBlur={onBlur}
                            />
                            )}
                        /> */}
                        <ReuseInput
                            control={control}
                            name='expiryDate'
                            placeholder='mm/yy'
                        />
                    </View>

                    <View style={styles?.inputContainer}>
                        <Text style={authCommonstyles?.label}>Cvv <Text style={{color: "red"}}>*</Text></Text>
                        {/* <TextInput
                            label="***"
                            style={styles.input}
                            numberOfLines={1}
                            mode="outlined"
                            outlineColor={COLORS?.primary}
                            activeOutlineColor={COLORS?.primary}
                            textColor='#000'
                        /> */}
                        {/* <Controller
                            control={control}
                            name={'cvv'}
                            render={({ field: { value, onChange, onBlur }})=>(
                            <TextInput
                                placeholder='password'
                                style={styles.input}
                                textColor='#000'
                                value={value}
                                onChangeText={onChange}
                                outlineColor={COLORS?.primary}
                                activeOutlineColor={COLORS?.primary}
                                numberOfLines={1}
                                mode="outlined"
                                onBlur={onBlur}
                            />
                            )}
                        /> */}
                        <ReuseInput
                            control={control}
                            name='cvv'
                            placeholder='***'
                        />
                    </View>
                </View>
            </View>
           
            <View style={{justifyContent: "center", alignItems: "center", flex: 1, marginTop: 20, paddingHorizontal: 10, paddingVertical: 15, backgroundColor: COLORS?.deepGrayBg}}>
                <BigTitle text="Payment  Schedule" />
                <Text style={{textAlign: "center", marginTop: 8}}>Should you have initiated a payment with us, it will be documented and visible below.</Text>

                <PaymentTable payment={clientPaymentDetails as PaymentDataType[]} />

            </View>

        </ScrollView>
  )
}

export default Payment

const styles = StyleSheet.create({
    container: {

    },
    cardContainer: {
        backgroundColor: COLORS?.deepGrayBg,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 20
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
        height: 35,
        //   width: width / 4.3,
        //   height: height / 15,
        // width: "100%",
        backgroundColor: "white",
        color: "#000",

        
        // borderRadius: 20,
          
      }
    
})