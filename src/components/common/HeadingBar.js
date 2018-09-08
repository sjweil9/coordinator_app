import React from 'react';
import { View, Text } from 'react-native';

const HeadingBar = (props) => {
  const { textStyles, viewStyles } = styles;
  
  return(
    <View style={viewStyles}>
      <Text style={textStyles}>{props.headingText}</Text>
    </View>
  )
}

const styles = {
  textStyles: {
    fontSize: 40,
    color: '#c9ddff'
  },
  viewStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 15,
    backgroundColor: '#1f60e2'
  }
};

export { HeadingBar };
