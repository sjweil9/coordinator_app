import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = (props) => {
  return(
    <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle}>
      <Text style={styles.buttonTextStyle}>{props.buttonText}</Text>
    </TouchableOpacity>
  )
};

const styles = {
  buttonStyle: {
    backgroundColor: '#003C5A',
    padding: 2.5,
    elevation: 2,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'stretch',
    height: 40,
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: 24,
    color: '#c9ddff'
  },
}

export { Button };