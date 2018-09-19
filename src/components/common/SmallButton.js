import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const SmallButton = (props) => {
  return(
    <TouchableOpacity onPress={props.onPress} style={{ ...styles.buttonStyle, backgroundColor: props.backgroundColor }}>
      <Text style={styles.buttonTextStyle}>{props.buttonText}</Text>
    </TouchableOpacity>
  )
};

const styles = {
  buttonStyle: {
    padding: 2.5,
    elevation: 2,
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#c9ddff'
  },
}

export { SmallButton };