import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return(
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  )
};

const styles = {
  containerStyle: {
    elevation: 2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#2e528c',
    shadowColor: '#000',
    padding: 15,
  }
}

export { Card };