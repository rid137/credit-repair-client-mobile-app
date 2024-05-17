import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { authCommonstyles } from '@/app/(auth)'
import { TextInput } from 'react-native-paper'
import { COLORS } from '@/constants'
import TouchBtn from '@/components/TouchBtn'
import { Stack, router } from 'expo-router'
import { StatusBar } from 'react-native'

const SecurityNest = () => {
  return (
        <ScrollView style={{flex: 1, paddingHorizontal: 15, marginTop: 15}}>
          <StatusBar barStyle="dark-content" />
          <View style={{width: "100%"}}>
            <Text style={authCommonstyles?.label}>Old Password</Text>
            <TextInput
              // label="Enter details"
              style={styles.input}
              numberOfLines={1}
              // outlined= {"disabled"}
              mode="outlined"
              placeholder='Enter Old Password'
              outlineColor={COLORS?.primary}
              activeOutlineColor={COLORS?.primary}
              textColor='#000'
            />

            <Text style={authCommonstyles?.label}>New Password</Text>
              <TextInput
                // label="Enter details"
                style={styles.input}
                numberOfLines={1}
                // outlined= {"disabled"}
                mode="outlined"
                placeholder='Enter New Password'
                outlineColor={COLORS?.primary}
                activeOutlineColor={COLORS?.primary}
                textColor='#000'
              />

            <Text style={authCommonstyles?.label}>Confirm New Password</Text>
              <TextInput
                // label="Enter details"
                style={styles.input}
                numberOfLines={1}
                // outlined= {"disabled"}
                mode="outlined"
                placeholder='Confirm New Password'
                outlineColor={COLORS?.primary}
                activeOutlineColor={COLORS?.primary}
                textColor='#000'
              />

        </View>

        <View style={{width: "100%"}}>
          <TouchBtn text='Save Changes' onPress={() => router.push("/(drawer)/")} />
        </View>

    </ScrollView>
  )
}

export default SecurityNest

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
      marginTop: 5,
      marginBottom: 14,
      height: 35,
      backgroundColor: COLORS?.inputBg,
      color: "#000",
  },
})