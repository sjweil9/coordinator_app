import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { CardSection, Spinner, SmallButton, Button, TextField } from './common';
import Task from './Task';
import User from './User';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ActionCable } from 'react-actioncable-provider';
import Config from '../../config/config';

class ListDetail extends Component {
  static contextTypes = {
    cable: PropTypes.object.isRequired
  };
  
  constructor(props) {
    super(props)
    this.state = {
      listDetails: null,
      addingTask: false,
      loading: false,
      taskName: '',
      taskNameError: '',
      showCompletedTasks: false,
      invitingUser: false,
      userFriends: [],
    }
  }

  componentWillMount() {
    this.subscription = this.context.cable.subscriptions.create(
      { channel: 'ListsChannel', list_id: this.props.selectedList },
      {
        received: (data) => {
          console.log('received ws message')
          console.log(data);
        },
        connected: () => {
          console.log('connected!')
        },
        disconnected: () => {
          console.log('disconnected')
        },
        rejected: () => {
          console.log('rejected')
        }
      }
    )
    console.log(this.context.cable)
    this.preLoadFriends();
    fetch(`https://${Config.API_BASE}/lists/${this.props.selectedList}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
    }}).then(response => response.json())
    .then(responseJSON => {
      if (responseJSON.code && responseJSON.code != 200) {
        // handle error on list details
        console.log(responseJSON);
      }
      else {
        this.setState({
          ...this.state,
          listDetails: responseJSON,
        });
        this.props.setCurrentListTasks(responseJSON.tasks || []);
      }
    }).catch(error => {
      // handle error
      console.log(error);
    });
  }

  componentWillUnmount() {
    this.subscription && this.context.cable.subscriptions.remove(this.subscription)
  }

  preLoadFriends() {
    fetch(`https://${Config.API_BASE}/users/${this.props.currentUser.id}/friends?accepted=true`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
    }}).then(response => response.json())
    .then(responseJSON => {
      if (responseJSON.code && responseJSON.code != 200) {
        // handle error on list details
        console.log(responseJSON);
      }
      else {
        this.setState({ userFriends: responseJSON });
      }
    }).catch(error => {
      // handle error
      console.log(error);
    });
  }

  renderTasks() {
    return(
      <View style={styles.listContainer}>
        <FlatList
          data={this.state.showCompletedTasks ? this.props.currentListTasks : this.props.currentListTasks.filter(task => task.status !== 'completed')}
          renderItem={({item}) => <Task details={item} />}
          keyExtractor={(item, _index) => `${item.id}`}
        />
      </View>
    )
  }

  renderDropDown() {
    if (this.state.addingTask) {
      return(
        <View style={styles.dropDownContainer}>
          <View style={styles.dropDownRow}>
            <TextField
              value={this.state.taskName}
              placeholder='Enter a Task'
              onChangeText={taskName => this.setState({ taskName })}
              autoCorrect={false}
              placeholderTextColor='#003C5A'
              maxLength={50}
            />
            {this.renderButton()}
          </View>
          <Text style={styles.errorTextStyle}>{this.state.taskNameError}</Text>
        </View>
      )
    }
    return null;
  }

  renderInvitePane() {
    if (this.state.invitingUser) {
      const { created_user, followed_users, pending_users } = this.state.listDetails;
      const followed_user_ids = followed_users.map(follower => follower.id);
      const invited_user_ids = pending_users.map(invitee => invitee.id);
      const ineligible_ids = followed_user_ids.concat(invited_user_ids);
      const eligible_users = this.state.userFriends.filter(user => user.id !== created_user.id && !ineligible_ids.includes(user.id));
      if (eligible_users.length > 0) {
        return(
          <FlatList 
            data={eligible_users}
            renderItem={({item}) => <TouchableOpacity onPress={() => this.inviteUser(item.id)}><User details={item} /></TouchableOpacity>}
            keyExtractor={(item, _index) => `${item.id}`}
          />
        )
      }
      return(
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>No Eligible Users</Text>
      )
    }
    return null;
  }

  inviteUser(user_id) {
    fetch(`https://${Config.API_BASE}/lists/${this.props.selectedList}/invitees`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
      },
      body: JSON.stringify({ invited_user_id: user_id })
    }).then(response => response.json())
    .then(responseJSON => {
      // indicate success
    }).catch(error => {
      // handle error
      console.log(error);
    });
  }

  renderButton() {
    if (this.state.loading) {
      return(
        <Spinner size={'small'} />
      )
    }
    return(
      <SmallButton 
        onPress={() => this.createNewTask()}
        buttonText={'Add'}
        backgroundColor="#003c5a"
      />
    )
  }

  createNewTask() {
    this.setState({ loading: true })
    fetch(`https://${Config.API_BASE}/lists/${this.props.selectedList}/tasks`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
      },
      body: JSON.stringify({ title: this.state.taskName })
    }).then(response => response.json())
    .then(responseJSON => {
      this.setState({
        loading: false,
        taskName: ''
      })
      if (responseJSON.code && responseJSON.code != 201) {
        this.setState({ taskNameError: responseJSON.messages.title[0] })
      }
      else {
        // handled by WS, but should check status and do this if in polling mode
        // this.props.addCurrentListTask(responseJSON);
      }
    }).catch(error => {
      // handle error
      console.log(error);
    });
  }

  renderShowCompletedCheckBox() {
    if (this.state.showCompletedTasks) {
      return(
        <Image 
          source={{uri: 'https://www.iconsdb.com/icons/preview/color/003C5A/check-mark-3-xxl.png'}}
          style={styles.checkMarkStyle}
        />
      )
    }
    else {
      return null;
    }
  }

  handleReceivedTasks(response) {
    console.log('I received some tasks!')
    console.log(response);
    this.props.setCurrentListTasks(response);
  }

  render() {
    if (this.state.listDetails) {
      const { id, title, description, created_user, followed_users, pending_users } = this.state.listDetails;

      return(
        <KeyboardAvoidingView 
          style={styles.outerContainer}
          behavior="padding"
        >
          <ActionCable
            channel={{ channel: 'ListsChannel', list_id: this.props.selectedList }}
            onReceived={(response) => this.handleReceivedTasks(response)}
          />
          <ScrollView>
            <View style={styles.listHeader}>
              <CardSection bottomBorder={true}>
                <Text style={styles.titleText}>{title}</Text>
              </CardSection>
              <CardSection bottomBorder={true}>
                <Text style={styles.descriptionText}>{description}</Text>
              </CardSection>
              <CardSection>
                <Text style={styles.createdByBoldText}>Created By: </Text><Text style={styles.createdByText}>{created_user.first_name} {created_user.last_name}</Text>
              </CardSection>
              <CardSection>
                <Text style={styles.createdByBoldText}>Collaborators: </Text><Text style={styles.createdByText}>{followed_users.map(user => `${user.first_name} ${user.last_name}`).join(', ')}</Text>
              </CardSection>
              <CardSection>
                <Text style={styles.createdByBoldText}>Invitees: </Text><Text style={styles.createdByText}>{pending_users.map(user => `${user.first_name} ${user.last_name}`).join(', ')}</Text>
                <SmallButton 
                  onPress={() => this.setState({ invitingUser: !this.state.invitingUser })}
                  buttonText={this.state.invitingUser ? "-" : "+"}
                  backgroundColor={"#003c5a"}
                  height={25}
                  width={25}
                  margin={5}
                />
              </CardSection>
              {this.renderInvitePane()}
            </View>
            <Text style={styles.taskLabel}>--- Tasks ---</Text>
            <View style={{ alignItems: 'center' }}>
              <CardSection>
                <Text style={{ fontSize: 18 }}>Show Completed Tasks:</Text> 
                <TouchableOpacity style={styles.box} onPress={() => this.setState({ showCompletedTasks: !this.state.showCompletedTasks })}>
                  {this.renderShowCompletedCheckBox()}
                </TouchableOpacity>
              </CardSection>
            </View>
            {this.renderTasks()}
            <Button 
              onPress={() => this.setState({ addingTask: !this.state.addingTask })}
              buttonText={'Add New Task'}
            />
            {this.renderDropDown()}
          </ScrollView>
        </KeyboardAvoidingView>
      )
    }

    else {
      return(
        <View style={styles.spinnerContainer}>
          <Spinner size={'large'} />
        </View>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authToken: state.authToken,
    currentUser: state.currentUser,
    selectedList: state.selectedList,
    currentListTasks: state.currentListTasks,
  }
}

const styles = {
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
  },
  listHeader: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  titleText: {
    fontSize: 24,
    color: '#003C5A',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 18,
    color: '#003C5A',
  },
  createdByText: {
    fontSize: 14,
    color: '#003c5a',
  },
  createdByBoldText: {
    fontSize: 14,
    color: '#003c5a',
    fontWeight: 'bold',
  },
  spinnerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  taskLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#003C5A',
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  },
  dropDownContainer: {
    padding: 30,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderColor: '#003C5A',
    borderWidth: 2,
    borderRadius: 5,
    elevation: 2,
    margin: 20,
  },
  errorTextStyle: {
    color: '#D8000C',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5
  },
  dropDownRow: {
    flexDirection: 'row'
  },
  box: {
    padding: 2,
    borderWidth: 2,
    borderColor: '#003c5a',
    width: 45,
    height: 30,
    backgroundColor: '#c9ddff',
    marginLeft: 10,
  },
  checkMarkStyle: {
    width: 30,
    height: 20,
  }
}

export default connect(mapStateToProps, actions)(ListDetail);