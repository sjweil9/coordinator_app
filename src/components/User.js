import React from 'react';
import { Text, View, Image } from 'react-native';
import { CardSection } from './common';

const User = (props) => {
  const { thumbnailStyle, headingStyle, headingText, otherText, container } = styles;

  return(
    <View style={container}>
      <CardSection>
        <View>
          <Image 
            style={thumbnailStyle}
            source={{ uri: 'https://i.stack.imgur.com/WmvM0.png' }} 
          />
        </View>
        <View style={headingStyle}>
          <Text style={headingText}>{props.details.first_name} {props.details.last_name}</Text>
          <Text style={otherText}>{props.details.email}</Text>
          <Text style={otherText}>Joined: {props.details.created_at}</Text>
        </View>
      </CardSection>
    </View>
  )
};

const styles = {
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: '#95afdb',
    borderColor: '#003c5a',
    borderRadius: 5,
    borderWidth: 1,
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
  },
  headingStyle: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    marginLeft: 5,
  },
  headingText: {
    fontSize: 16,
    color: '#003c5a'
  },
  otherText: {
    color: '#003c5a',
  }
}

export default User;