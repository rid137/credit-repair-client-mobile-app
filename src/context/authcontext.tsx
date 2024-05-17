import { createContext, useEffect, useState, ReactNode } from 'react';
// import { CardDetailsType, ClientDetailsType } from '../types/clientDetailsObj';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '@/app/libs';
import { CardDetailsType, ClientDetailsType } from '@/types/clientDetailsObj';
import { Alert } from 'react-native';
import { router } from 'expo-router';


type UserType = {
  email?: string 
  firstName?: string
  middleName?: string
  lastName?: string
  phoneNumber?: string
  password?: string
  confirmPassword?: string
  gId?: string | null
  addPf?: string | null
  transactionId?: string
  ssn?: string
  state?: string
  zipCode?: string
  dob?: string | Date
  streetAddr?: string
  consultMethod?: string
  referralMethod?: string
  otp?: string

  // type?: 'Doctor' | 'Patient' | 'Pharmacy',
  // password?: string
}

interface UserAuthData {
  token: string
  refreshToken: string
  userId: number
  email: string
  role: string
}

interface AuthContextType {
  user: UserType | null
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>

  clientDetials: ClientDetailsType | null
  setClientDetials: React.Dispatch<React.SetStateAction<ClientDetailsType | null>>

  userAuthData: UserAuthData | null
  setUserAuthData: React.Dispatch<React.SetStateAction<UserAuthData | null>>

  cardDetails: CardDetailsType | null
  setCardDetails: React.Dispatch<React.SetStateAction<CardDetailsType | null>>

  logout: () => void

}
    
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);


export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null); 
  const [clientDetials, setClientDetials] = useState<any>(); //I will work on the 'any' type later
  const [userAuthData, setUserAuthData] = useState<UserAuthData | null>(null)
  const [cardDetails, setCardDetails] = useState<CardDetailsType | null>(null)

  const LOCAL_STORAGE_CLIENTDETAILS_KEY = "clientDetials"
  const LOCAL_STORAGE_USERAUTHDATA_KEY = "userAuthData"

  console.log("userAuthData",userAuthData)

  const storeData = async (value: UserAuthData) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user-auth-data', jsonValue);
    } catch (e) {
      // saving error
      console.log(e)
    }
  };

  useEffect(() => {
    if (userAuthData) {
      // localStorage.setItem(LOCAL_STORAGE_USERAUTHDATA_KEY, JSON.stringify(userAuthData));
      storeData(userAuthData)
    }
  }, [userAuthData]);

  useEffect(() => {
    (async () => {
      try {
        let jsonValue = await AsyncStorage.getItem('user-auth-data');
        if(jsonValue) {
          const parsedData: UserAuthData = JSON.parse(jsonValue);
          setUserAuthData(parsedData)
        }
        // return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
        console.log(e)
      }
    }) ()

  }, [])

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/getUser/${userAuthData?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${userAuthData?.token}`,
            // 'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
      const res = response.data;
      setClientDetials(res)
  
      return res;
    }
    } catch (error) {
      console.error('Error Fetching Client Info:', error);
    }
  };

  useEffect(() => {
    
    if (userAuthData) {
      getUserInfo()
    }
  }, [userAuthData])

  const onLogOut = async () => {
    try {
      await AsyncStorage.removeItem('user-auth-data')
    } catch(e) {
      console.log(e)
    }
    setUserAuthData(null);
    router.push("/(auth)/")
  }

  const logout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
      },
      {
        text: "LogOut",
        style: "destructive",
        onPress: onLogOut,
      }
    ])
  };


    return (
      <AuthContext.Provider value={{ user, setUser, userAuthData, setUserAuthData, logout, clientDetials, setClientDetials, cardDetails, setCardDetails }}>
        {children}
      </AuthContext.Provider>
    )
};










// type UserContextType = {
//     user: UserType | null
//     setUser: React.Dispatch<React.SetStateAction<UserType | null>>
// }

// type SignUpContextProviderProps = {
//     children: React.ReactNode
// }

// export const SignUpContext = createContext({} as UserContextType)

// export const SignUpContextProvider = ({ children }: SignUpContextProviderProps) => {
//     const [user, setUser] = useState<UserType | null>(null)

//     return (
//         <SignUpContext.Provider value={{ user, setUser }}>
//             {children}
//         </SignUpContext.Provider>
//     )
// }


  