import React, {memo} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {Navigation} from '../types';
import {Text} from 'react-native-paper';
import {theme} from '../core/theme';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { setSignOut } from '../redux/slices/authSlice';
import { API_URL } from '../constants/api';
import { ToastAndroid } from "react-native";

const Dashboard = ({navigation}) => {
  const user = useSelector(state => state.userAuth.user);
  const token = useSelector(state => state.userAuth.accessToken);
  const dispatch = useDispatch(setSignOut);

  const showToastWithGravity = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  const handleLogout = () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(API_URL + '/api/sign-out', {}, config)
      .then(response => {
        console.log(response);
        if (response.data.success) {
          dispatch(setSignOut());
          showToastWithGravity('Logged out');
        } else {
          showToastWithGravity('Error while logging out');
        }
      })
      .catch(error => {
        showToastWithGravity('Error while logging out');
        console.error(error);
      });
  };

  return (
    <Background>
    <Header>Let’s start</Header>
    <Paragraph>
      <Text style={{color: theme.colors.primary, fontSize: 20}}>
        Hemlo there, hope you are having a good day!! {'\n\n'} 👨‍💻🖤
      </Text>
    </Paragraph>
    <Button mode="outlined" onPress={() => navigation.navigate('Listing')}>
      Show Passwords 👀👀
    </Button>
    <Button mode="outlined" onPress={() => handleLogout()}>
      Logout
    </Button>
  </Background>
  );
};

export default memo(Dashboard);
