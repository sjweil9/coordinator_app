import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { CardSection, SmallButton } from './common';
import { connect } from 'react-redux';

class Task extends Component {
  constructor(props) {
    super(props)
    this.claimTask = this.claimTask.bind(this);
    this.state = {
      task: props.details
    }
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

  renderStatus() {
    if (this.props.details.status == 'claimed') {
      return(
        <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
          {this.props.details.claimed_user.first_name[0].toUpperCase()}{this.props.details.claimed_user.last_name[0].toUpperCase()}
        </Text>
      )
    }
    return null;
  }

  claimTask() {
    this.changeTaskStatus('claimed');
  }

  unclaimTask() {
    this.changeTaskStatus('unclaimed');
  }

  changeTaskStatus(action) {
    if (!this.props.details.claimed_user || action == 'unclaimed') {
      fetch(`http://192.168.1.72:3000/lists/${this.props.selectedList}/tasks/${this.props.details.id}/status`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.props.authToken,
        },
        body: JSON.stringify({
          status: action
        }),
      }).then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.code && responseJSON.code != 200) {
          // handle error on list details
          console.log(responseJSON);
        }
        else {
          this.setState({
            ...this.state,
            task: responseJSON,
          });
        }
      }).catch(error => {
        // handle error
        console.log(error);
      });
    }
    else if (this.props.details.claimed_user.id == this.props.currentUser.id) {
      Alert.alert(
        'Choose Action',
        `Complete or Unclaim?`,
        [
          {text: 'Complete', onPress: () => this.completeTask()},
          {text: 'Unclaim', onPress: () => this.unclaimTask()},
        ],
        { cancelable: true }
      )
    }
    else {
      Alert.alert(
        'Already Claimed',
        `Task already claimed by ${this.props.details.claimed_user.first_name} ${this.props.details.claimed_user.last_name}`,
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
      )    
    }
  }

  completeTask() {
    // implement me
  }

  render() {
    return(
      <View style={styles.taskWrapper}>
        <TouchableOpacity style={styles.leftInnerWrapper} onPress={this.claimTask}>
          {this.renderStatus()}
        </TouchableOpacity>
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
  headingText: {
    fontSize: 20,
    fontWeight: 'bold'
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

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authToken: state.authToken,
    currentUser: state.currentUser,
    userCreatedLists: state.userCreatedLists,
    selectedList: state.selectedList,
  }
}

export default connect(mapStateToProps)(Task);