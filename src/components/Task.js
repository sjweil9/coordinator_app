import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, CardSection } from './common';

export default class Task extends Component {
  constructor(props) {
    super(props)
  }

  statusText() {
    switch(this.props.details.status) {
      case 'unclaimed': {
        return `Unclaimed - Due: ${this.props.details.due_at}`;
      } 
      case 'claimed': {
        return `Claimed - Due: ${this.props.details.due_at}`;
      }
      case 'completed': {
        return `Completed: ${this.props.details.completed_at}`;
      }
      default: {
        return '';
      }
    }
  }

  render() {
    return(
      <Card>
        <CardSection>
          <Text style={styles.headingText}>{this.props.details.title}</Text>
        </CardSection>
        <CardSection>
          <View style={styles.lowerBox}>
            <Text style={styles.descriptionText}>{this.props.details.description}</Text>
            <Text style={styles.statusText}>{this.statusText()}</Text>
          </View>
        </CardSection>
      </Card>
    )
  }
};

const styles = {
  descriptionText: {
    fontSize: 12,
  },
  headingText: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  lowerBox: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  }
}
