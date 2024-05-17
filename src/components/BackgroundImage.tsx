import React from 'react';
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
// import wolfAuthBg from "../../assets/images/wolfAuthBg.jpeg";


// Define props for the Background component
interface BackgroundProps {
  children: React.ReactNode; // Content to render inside the background
}

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};


const Background: React.FC<BackgroundProps> = ({ children }) => {

  const wolfAuthBg = require('../../assets/images/wolfAuthBg.jpeg')

  return (
    // <View style={styles.container}>

    <ImageBackground
      // source={image}
      // source={{uri: '../../assets/images/wolfAuthBg.jpeg'}}
      source={require("../../assets/images/wolfAuthBg.jpeg")}
      style={styles.background}>
      {/* <StatusBar barStyle="light-content" /> */}

      {children}
    </ImageBackground>
    // </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Or 'stretch' or 'contain'
  
    justifyContent: 'center',
  },
});

export default Background;
