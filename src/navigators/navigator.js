import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './appNavigator';
import AuthNavigator from './authNavigator';
import { selectIsLoggedIn } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';

const AppRoute = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <NavigationContainer>
            {/* Conditional stack navigator rendering based on login state */}

            {
                isLoggedIn ? <AppNavigator /> : <AuthNavigator />
            }
        </NavigationContainer>
    )
}

export default AppRoute