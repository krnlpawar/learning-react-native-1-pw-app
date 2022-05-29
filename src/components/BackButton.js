import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../core/theme';

const BackButton = ({ goBack, title }) => (
  <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
        <Image style={styles.image} source={require('../../assets/arrow_back.png')} />
    </TouchableOpacity>

        <Text style={styles.header}>{title}</Text>
        <Text></Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    top: -5,
    left: 0,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
  },
  image: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.primary
  }
});

export default memo(BackButton);
