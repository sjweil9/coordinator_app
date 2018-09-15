import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const HamburgerButton = (props) => {
  return(
    <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle}>
      <Text style={styles.textStyle}>{props.buttonText}</Text>
    </TouchableOpacity>
  )
};

const styles = {
  buttonStyle: {
    backgroundColor: '#95afdb',
    padding: 10,
    elevation: 2,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderColor: '#003c5a',
    borderWidth: 1,
  },
  textStyle: {
    fontSize: 24,
    color: '#003C5A'
  }
}

export default HamburgerButton;