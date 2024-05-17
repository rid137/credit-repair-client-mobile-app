import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import { COLORS } from '@/constants';

interface ReuseInputProps {
    control: any,
    name: string,
    placeholder?: string,
    underlineColorAndroid?: string
    numberOfLines?: number,
    placeholderTextColor?: string,
    multiline?: boolean
    textArea?: boolean
    right?: any
    left?: any
    secureTextEntry?: boolean
}

const ReuseInput = ({control, name, placeholder, underlineColorAndroid, numberOfLines, left, placeholderTextColor, secureTextEntry, multiline, right, textArea, ...rest}: ReuseInputProps) => {

  return (
    <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur }, fieldState: { error }}) => (
            <>
                <TextInput
                    placeholder={placeholder}
                    style={textArea ? styles.textA : styles.input}
                    textColor='#000'
                    value={value}
                    onChangeText={onChange}
                    outlineColor={COLORS?.primary}
                    activeOutlineColor={COLORS?.primary}
                    underlineColorAndroid={underlineColorAndroid}
                    numberOfLines={numberOfLines ? numberOfLines : 1}
                    placeholderTextColor={placeholderTextColor}
                    multiline={multiline}
                    secureTextEntry={secureTextEntry}
                    mode="outlined"
                    right={right}
                    left={left}
                    onBlur={onBlur}
                    {...rest}

                />
                {error && <Text style={styles.errorMessage}>
                        {error.message}
                        </Text>
                }
            </>
        )}
    />
  )
}

export default ReuseInput;

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        marginTop: 5,
        marginBottom: 14,
        height: 40,
        // paddingVertical: 10,
        //   width: width / 4.3,
        //   height: height / 15,
        // width: "100%",
        backgroundColor: COLORS?.inputBg,
        // color: "#000",

        
        // borderRadius: 20,
          
    },
    textA: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 14,
        height: 35,
        backgroundColor: "grey",
    },
    errorMessage: {
        color: "#f00"
    }
})