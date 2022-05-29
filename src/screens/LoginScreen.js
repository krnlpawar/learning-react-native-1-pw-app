import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { emailValidator, passwordValidator } from '../core/utils';
import { useDispatch } from 'react-redux'
import { setSignIn } from '../redux/slices/authSlice';
import axios from 'axios';
import { ToastAndroid } from "react-native";
import { API_URL } from '../constants/api';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: 'admin@admin.com', error: '' });
  const [password, setPassword] = useState({ value: 'password', error: '' });
  const dispatch = useDispatch()

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    handleLogin(email, password)
  };

  const showToastWithGravity = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  const handleLogin = (email, password) => {
      console.log(email, password)
      axios.post(API_URL+'/api/sign-in', {
          email: email.value,
          password: password.value
      })
      .then(response => {
        console.log(response)
        if(response.data.access_token !== ''){
            const user = {
                isLoggedIn: true,
                user: response.data.user,
                access_token: response.data.access_token
            };
            dispatch(setSignIn(user));
        }
        else{
            showToastWithGravity('Invalid Credentials')
        }
      })
      .catch(error => {
        showToastWithGravity('Invalid Credentials')
        console.error(error);
      });
  }

  return (
    <Background>
      <Header>Welcome back!!!</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

    </Background>
  );
};
export default memo(LoginScreen);
