import React from 'react';
import { View } from 'react-native';
import { HeadingBar } from './src/components/common';
import List from './src/components/List';
import LoginScreen from './src/components/LoginScreen';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <LoginScreen />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#c9ddff'
  }
}

// <List itemUrl={'tasks'} itemType={'task'} />