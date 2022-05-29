/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Provider as PaperProvider,
  DarkTheme,
  Button,
  Appbar,
  light,
} from 'react-native-paper';
import { Provider } from 'react-redux';
import theme from './src/core/theme';
import AppRoute from './src/navigators/navigator';
import { store } from './src/redux/store';

function CustomNavigationBar({navigation, back, options}) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options.title ? options.title : 'My App'} />
    </Appbar.Header>
  );
}

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <PaperProvider theme={theme}>
        <Provider store={store}>
            <AppRoute />
        </Provider>
      </PaperProvider>
    </SafeAreaView>
  );
};

export default App;
