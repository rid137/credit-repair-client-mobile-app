import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface BigTitleProps {
    text: string
}

const BigTitle = ({text}: BigTitleProps) => {
  return (
    <View>
      <Text style={styles?.text}>{text}</Text>
    </View>
  )
}

export default BigTitle

const styles = StyleSheet.create({
    text: {
        fontWeight: "bold",
        fontSize: 17
    }
})