import React from 'react';
import { Text, View, Image } from 'react-native';
import { Card, CardSection } from './common';

const User = (props) => {
  const { thumbnailStyle, headingStyle, headingText } = styles;

  return(
    <Card>
      <CardSection>
        <View>
          <Image 
            style={thumbnailStyle}
            source={{ uri: 'https://i.stack.imgur.com/WmvM0.png' }} 
          />
        </View>
        <View style={headingStyle}>
          <Text style={headingText}>{props.details.first_name} {props.details.last_name}</Text>
          <Text>{props.details.email}</Text>
          <Text>Joined: {props.details.created_at}</Text>
        </View>
      </CardSection>
    </Card>
  )
};

const styles = {
  thumbnailStyle: {
    height: 75,
    width: 75
  },
  headingStyle: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    marginLeft: 5,
  },
  headingText: {
    fontSize: 16,
  }
}

export default User;