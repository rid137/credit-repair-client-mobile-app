import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from '@components/FormInput';
import FormButton from '@components/FormButton';
import Background from '@/components/BackgroundImage';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    return (
        <Background>
      <View style={styles.container}>
        <Title style={styles.titleText}>Welcome to Chat app</Title>
        <FormInput
          labelName='Email'
          value={email}
          autoCapitalize='none'
          onChangeText={(userEmail : string) => setEmail(userEmail)}
        />
        <FormInput
          labelName='Password'
          value={password}
          secureTextEntry={true}
          onChangeText={(userPassword: string) => setPassword(userPassword)}
        />
        <FormButton
          title='Login'
          modeValue='contained'
          labelStyle={styles.loginButtonLabel}
        />
        <FormButton
          title='New user? Join here'
          modeValue='text'
          uppercase={false}
          labelStyle={styles.navButtonText}
        />
      </View>
      </Background>
    );
}


const styles = StyleSheet.create({
    container: {
    //   backgroundColor: '#f5f5f5',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    titleText: {
      fontSize: 24,
      marginBottom: 10
    },
    loginButtonLabel: {
      fontSize: 22
    },
    navButtonText: {
      fontSize: 16
    }
  });