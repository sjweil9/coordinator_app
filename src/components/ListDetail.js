import React, { Component } from 'react';
import { View, Text, FlatList, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { CardSection, Spinner, SmallButton, Button, TextField } from './common';
import Task from './Task';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ListDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listDetails: null,
      addingTask: false,
      loading: false,
      taskName: '',
      taskNameError: '',
      showCompletedTasks: true,
    }
  }

  componentWillMount() {
    console.log('mounting list detail')
    fetch(`http://192.168.1.72:3000/lists/${this.props.selectedList}`, {
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
    fetch(`http://192.168.1.72:3000/lists/${this.props.selectedList}/tasks`, {
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
        this.props.addCurrentListTask(responseJSON);
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

  render() {
    if (this.state.listDetails) {
      const { id, title, description, created_user } = this.state.listDetails;

      return(
        <KeyboardAvoidingView 
          style={styles.outerContainer}
          behavior="padding"
        >
          <ScrollView>
            <View style={styles.listHeader}>
              <CardSection bottomBorder={true}>
                <Text style={styles.titleText}>{title}</Text>
              </CardSection>
              <CardSection bottomBorder={true}>
                <Text style={styles.descriptionText}>{description}</Text>
              </CardSection>
              <CardSection>
                <Text style={styles.createdByText}>Created By: {created_user.first_name} {created_user.last_name}</Text>
              </CardSection>
              <CardSection>
                <Text style={styles.createdByText}>Collaborators: </Text>
              </CardSection>
              <CardSection>
                <Text style={{ fontSize: 18 }}>Show Completed Tasks:</Text> 
                <TouchableOpacity style={styles.box} onPress={() => this.setState({ showCompletedTasks: !this.state.showCompletedTasks })}>
                  {this.renderShowCompletedCheckBox()}
                </TouchableOpacity>
              </CardSection>
            </View>
            <Text style={styles.taskLabel}>--- Tasks ---</Text>
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
    alignSelf: 'stretch',
    textAlign: 'center',
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