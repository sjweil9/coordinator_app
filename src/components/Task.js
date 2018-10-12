import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { CardSection, SmallButton } from './common';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Task extends Component {
  constructor(props) {
    super(props)
    this.actOnTask = this.actOnTask.bind(this);
  }

  renderDeleteButton() {
    if (this.props.details.created_user && this.props.details.created_user.id == this.props.currentUser.id) {
      return(
        <SmallButton 
            onPress={() => this.deleteTask()}
            buttonText={'Delete'}
            backgroundColor={'#D8000C'}
        />
      )
    }
    return null;
  }

  deleteTask() {
    fetch(`http://192.168.1.72:3000/tasks/${this.props.details.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
      }
    }).then(response => response.json())
    .then(responseJSON => {
      if (responseJSON.code && responseJSON.code != 204) {
        // handle error on list details
        console.log(responseJSON);
        Alert.alert(
          'Error',
          `${Object.values(responseJSON.messages[0])[0]}`,
          [
            {text: 'OK', onPress: () => null},
          ],
          { cancelable: true }
        )
      }
      else {
        // trigger parent to re-render
        const remaining_tasks = this.props.currentListTasks.filter(task => task.id !== this.props.details.id)
        this.props.setCurrentListTasks(remaining_tasks);
      }
    }).catch(error => {
      // handle error
      console.log(error);
    });
  }

  renderStatus() {
    console.log(`render status on task ${this.props.details.id} ${this.props.details.status}`)
    if (this.props.details.status == 'claimed') {
      return(
        <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
          {this.props.details.claimed_user.first_name[0].toUpperCase()}{this.props.details.claimed_user.last_name[0].toUpperCase()}
        </Text>
      )
    }
    else if (this.props.details.status == 'completed') {
      return(
        <Image 
          source={{uri: 'https://www.iconsdb.com/icons/preview/color/003C5A/check-mark-3-xxl.png'}}
          style={styles.checkMarkStyle}
        />
      )
    }
    return null;
  }

  actOnTask() {
    const claimedUser = this.props.details.claimed_user;
    if (this.props.details.status == 'unclaimed') {
      this.changeTaskStatus('claimed');
    }
    else if (this.props.details.status == 'claimed' && claimedUser && claimedUser.id == this.props.currentUser.id) {
      this.unClaimOrCompleteAlert();
    }
    else if (this.props.details.status == 'completed' && claimedUser && claimedUser.id == this.props.currentUser.id) {
      this.reverseCompletionAlert();
    }
  }

  claimTask() {
    this.changeTaskStatus('claimed');
  }

  unclaimTask() {
    this.changeTaskStatus('unclaimed');
  }

  changeTaskStatus(action) {
    const claimedUser = this.props.details.claimed_user;
    const ownedByUser = claimedUser && claimedUser.id == this.props.currentUser.id;
    if (!claimedUser || action == 'unclaimed' || (ownedByUser)) {
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
          // handle error (expecting lock error)
          Alert.alert(
            'Error',
            `${Object.values(responseJSON.messages[0])[0]}`,
            [
              {text: 'OK', onPress: () => null},
            ],
            { cancelable: true }
          )
        }
        else {
          this.props.updateListTask(this.props.details.id, responseJSON);
        }
      }).catch(error => {
        // handle error
        console.log(error);
      });
    }
    else {
      this.alreadyClaimedAlert();    
    }
  }

  completeTask() {
    this.changeTaskStatus('completed');
  }

  unCompleteTask() {
    this.changeTaskStatus('claimed');
  }

  unClaimOrCompleteAlert() {
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

  alreadyClaimedAlert() {
    Alert.alert(
      'Already Claimed',
      `Task already claimed by ${this.props.details.claimed_user.first_name} ${this.props.details.claimed_user.last_name}`,
      [
        {text: 'OK', onPress: () => null},
      ],
      { cancelable: true }
    )
  }

  reverseCompletionAlert() {
    Alert.alert(
      'Mark as Incomplete?',
      'You will still own the task',
      [
        {text: 'OK', onPress: () => this.unCompleteTask()},
        {text: 'Cancel', onPress: () => null}
      ],
      { cancelable: true }
    )
  }

  render() {
    return(
      <View style={styles.taskWrapper}>
        <TouchableOpacity style={styles.leftInnerWrapper} onPress={this.actOnTask}>
          <View style={styles.box}>
            {this.renderStatus()}
          </View>
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
    padding: 5,
  },
  leftInnerWrapper: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#003c5a',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleInnerWrapper: {
    flex: 3
  },
  rightInnerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    padding: 2,
    borderWidth: 2,
    borderColor: '#003c5a',
    width: 45,
    height: 30,
    backgroundColor: '#c9ddff'
  },
  checkMarkStyle: {
    width: 30,
    height: 20,
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authToken: state.authToken,
    currentUser: state.currentUser,
    userCreatedLists: state.userCreatedLists,
    selectedList: state.selectedList,
    currentListTasks: state.currentListTasks,
  }
}

export default connect(mapStateToProps, actions)(Task);