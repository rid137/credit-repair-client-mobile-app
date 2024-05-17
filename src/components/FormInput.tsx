import { COLORS, SIZES } from '@/constants';
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');


export default function FormInput({ labelName, ...rest }: any) {

    return (
      <TextInput
        label={labelName}
        style={styles.input}
        numberOfLines={1}
        // outlined= {"disabled"}
        mode="outlined"
        outlineColor={COLORS?.primary}
        activeOutlineColor={COLORS?.primary}
        textColor='#000'

        
        
        // right={<TextInput.Affix text="/100" />}


        {...rest}
        
      />
    );
  }

  const styles = StyleSheet.create({
    input: {
        marginTop: 5,
        marginBottom: 14,
        // height: 20,
        //   width: width / 4.3,
        //   height: height / 15,
        width: "100%",
        backgroundColor: COLORS?.inputBg,
        color: "#000",

        
        borderRadius: 20,
        
    }
  });