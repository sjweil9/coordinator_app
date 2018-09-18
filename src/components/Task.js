import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection, SmallButton } from './common';

export default class Task extends Component {
  constructor(props) {
    super(props)
  }

  statusText() {
    switch(this.props.details.status) {
      case 'unclaimed': {
        return `Unclaimed - Due: ${this.props.details.due_at || 'N/A'}`;
      } 
      case 'claimed': {
        return `Claimed - Due: ${this.props.details.due_at || 'N/A'}`;
      }
      case 'completed': {
        return `Completed: ${this.props.details.completed_at || 'N/A'}`;
      }
      default: {
        return '';
      }
    }
  }

  renderClaimButton() {
    if (this.props.details.status === 'unclaimed') {
      return(
        <SmallButton 
            onPress={() => null}
            buttonText={'Claim'}
            backgroundColor={'#003C5A'}
        />
      )
    }
    return null;
  }

  renderCompleteButton() {
    if (this.props.details.status === 'claimed' && this.props.details.claimed_user && this.props.details.claimed_user.id == this.props.currentUser.id) {
      return(
        <SmallButton 
            onPress={() => null}
            buttonText={'Complete'}
            backgroundColor={'#003C5A'}
        />
      )
    }
    return null;
  }

  renderDeleteButton() {
    if (this.props.details.created_user && this.props.details.created_user.id == this.props.currentUser.id) {
      return(
        <SmallButton 
            onPress={() => null}
            buttonText={'Delete'}
            backgroundColor={'#D8000C'}
        />
      )
    }
    return null;
  }

  render() {
    return(
      <View style={styles.taskWrapper}>
        <CardSection>
          <Text style={styles.headingText}>{this.props.details.title}</Text>
        </CardSection>
        <CardSection bottomBorder={true}>
          <View style={styles.lowerBox}>
            <Text style={styles.descriptionText}>{this.props.details.description}</Text>
            <Text style={styles.statusText}>{this.statusText()}</Text>
          </View>
        </CardSection>
        <CardSection>
          {this.renderClaimButton()}
          {this.renderCompleteButton()}
          {this.renderDeleteButton()}
        </CardSection>
      </View>
    )
  }
};

const styles = {
  descriptionText: {
    fontSize: 12,
  },
  headingText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  lowerBox: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  taskWrapper: {
    backgroundColor: '#95afdb',
    borderColor: '#003C5A',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  }
}
