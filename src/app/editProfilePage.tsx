import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TouchBtn from '@/components/TouchBtn'
import { authCommonstyles } from '@/app/(auth)'
import { COLORS, SIZES } from '@/constants'
import { TextInput } from 'react-native-paper'
import { router } from 'expo-router'
const img = require("@assets/images/Avatar.png")


const EditProfileNest = () => {
  return (
    <ScrollView style={{flex: 1, paddingHorizontal: 15, marginTop: 15}}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles?.bodyContainer}>
        <Image 
          source={img}
        />
        {/* <Text style={{fontWeight: "bold", marginTop: 12}}>Dianne Russell</Text>
        <Text>Russell7896@gmail.com</Text>
        <Text>(603) 555-0123</Text> */}

      </View>

      <View style={styles.btnContainer}>
        <TouchBtn text="Change Picture" />
        
        <TouchableOpacity style={styles.btn}><Text style={styles?.btnText}>Delete Picture</Text></TouchableOpacity>
      </View>

      {/* <View style={}> */}
        <View style={{width: "100%"}}>
            <Text style={authCommonstyles?.label}>Full Name</Text>
            <TextInput
              // label="Enter details"
              style={styles.input}
              numberOfLines={1}
              // outlined= {"disabled"}
              mode="outlined"
              placeholder='Dianne Russell'
              outlineColor={COLORS?.primary}
              activeOutlineColor={COLORS?.primary}
              textColor='#000'
            />

            <Text style={authCommonstyles?.label}>Phone Number</Text>
              <TextInput
                // label="Enter details"
                style={styles.input}
                numberOfLines={1}
                // outlined= {"disabled"}
                mode="outlined"
                placeholder='(603) 555-0123'
                outlineColor={COLORS?.primary}
                activeOutlineColor={COLORS?.primary}
                textColor='#000'
              />

            <Text style={authCommonstyles?.label}>Email Address</Text>
              <TextInput
                // label="Enter details"
                style={styles.input}
                numberOfLines={1}
                // outlined= {"disabled"}
                mode="outlined"
                placeholder='Russell7896@gmail.com'
                outlineColor={COLORS?.primary}
                activeOutlineColor={COLORS?.primary}
                textColor='#000'
              />

        </View>

        <View style={{width: "100%"}}>
          <TouchBtn text='Save Changes' onPress={() => router.push("/(drawer)/")} />
        </View>


      {/* </View> */}





    </ScrollView>
  )
}

export default EditProfileNest

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
  btn: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "white",
    padding: 12,
    alignItems: "center",
    borderRadius: SIZES?.small,
    marginVertical: 10,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black"
  }

})