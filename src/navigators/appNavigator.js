import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen';
import Dashboard from '../screens/Dashboard';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
        headerShown: false,
      }}>
      <Stack.Screen
        name="Listing"
        options={{title: 'Listing'}}
        component={ListScreen}
      />
      <Stack.Screen
        name="Dashboard"
        options={{title: 'Dashboard'}}
        component={Dashboard}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
