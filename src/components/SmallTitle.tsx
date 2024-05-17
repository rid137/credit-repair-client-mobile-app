import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface SmallTitleProps {
    text: string
}

const SmallTitle = ({text}: SmallTitleProps) => {
  return (
    <View>
      <Text style={styles?.text} >{text}</Text>
    </View>
  )
}

export default SmallTitle

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: "bold"
    }
})