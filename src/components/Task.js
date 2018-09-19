import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection, SmallButton } from './common';

export default class Task extends Component {
  constructor(props) {
    super(props)
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
        <View style={styles.leftInnerWrapper}>
          {this.renderClaimButton()}
          {this.renderCompleteButton()}
        </View>
        <View style={styles.middleInnerWrapper}>
          <CardSection>
            <Text style={styles.headingText}>{this.props.details.title}</Text>
          </CardSection>
        </View>
        <View style={styles.rightInnerWrapper}>
          {this.renderDeleteButton()}
        </View>
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
    marginRight: 20,
    flex: 1,
    flexDirection: 'row',
  },
  leftInnerWrapper: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#003c5a',
    padding: 5,
    justifyContent: 'center',
  },
  middleInnerWrapper: {
    flex: 3
  },
  rightInnerWrapper: {
    flex: 1,
  }
}
