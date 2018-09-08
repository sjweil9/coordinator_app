import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return(
    <View style={styles}>
      {props.children}
    </View>
  )
};

const styles = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  position: 'relative',
  padding: 5,
  borderWidth: 1,
  borderRadius: 10,
  borderColor: '#2e528c',
  marginBottom: 10,
  elevation: 5,
}

export { CardSection };