import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        options={{title: 'Login'}}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
