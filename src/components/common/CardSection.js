import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  const styles = {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
    padding: 5,
    borderBottomWidth: props.bottomBorder ? 1 : 0,
    borderColor: '#003c5a',
    marginLeft: 10,
    marginRight: 10,
  }

  return(
    <View style={props.additionalStyles || styles}>
      {props.children}
    </View>
  )
};

export { CardSection };