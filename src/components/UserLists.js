import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ListItem from './ListItem';
import InviteItem from './InviteItem';
import { Button, TextField, Spinner } from './common';

class UserLists extends Component {
  constructor(props) {
    super(props)
    this.props.setUserCreatedLists = this.props.setUserCreatedLists.bind(this);
    this.state = {
      addListDropDown: false,
      listTitle: '',
      listDescription: '',
      loading: false,
      descriptionError: '',
      titleError: '',
      viewingSubscribed: true,
    }
  }

  componentWillMount() {
    this.fetchLists(); 
  }

  fetchLists() {
    this.props.setUserCreatedLists([]);
    console.log(this.state.viewingSubscribed);
    if (this.state.viewingSubscribed) {
      fetch(`http://192.168.1.72:3000/users/${this.props.currentUser.id}/lists`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
      }}).then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.code && responseJSON.code != 200) {
          // handle error on list
          console.log(responseJSON);
        }
        else {
          this.props.setUserCreatedLists(responseJSON);
        }
      });
    }
    else {
      fetch(`http://192.168.1.72:3000/users/${this.props.currentUser.id}/invites`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
      }}).then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.code && responseJSON.code != 200) {
          // handle error on list
          console.log(responseJSON);
        }
        else {
          this.props.setUserInvites(responseJSON);
        }
      });
    }
  }

  submitNewList() {
    this.setState({ loading: true, error: '' })
    fetch(`http://192.168.1.72:3000/users/${this.props.currentUser.id}/lists`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.listTitle,
        description: this.state.listDescription,
      }),
    }).then(response => response.json())
    .then(responseJSON => {
      this.setState({ loading: false, listTitle: '', listDescription: '' });
      if (responseJSON.code && responseJSON.code != 201) {
        this.setState({
          descriptionError: responseJSON.messages.description ? responseJSON.messages.description[0] : '',
          titleError: responseJSON.messages.title ? responseJSON.messages.title[0] : ''
        });
      }
      else {
        this.props.addUserCreatedList(responseJSON);
      }
    })
    .catch(error => {
      console.log(error);
      this.setState({ loading: false });
    });
  }

  renderButton() {
    if (this.state.loading) {
      return(
        <Spinner size={'small'} />
      )
    }
    return(
      <Button 
        onPress={() => this.submitNewList()}
        buttonText={'Submit'}
      />
    )
  }

  renderDropDown() {
    if (this.state.addListDropDown) {
      return(
        <View style={styles.dropDownContainer}>
          <TextField
            value={this.state.listTitle}
            placeholder='Title Your List'
            onChangeText={listTitle => this.setState({ listTitle })}
            autoCorrect={false}
            placeholderTextColor='#003C5A'
            maxLength={100}
          />
          <Text style={styles.errorTextStyle}>{this.state.titleError}</Text>
          <TextField
            value={this.state.listDescription}
            placeholder='Add a Description'
            onChangeText={listDescription => this.setState({ listDescription })}
            autoCorrect={false}
            placeholderTextColor='#003C5A'
            multiline={true}
            maxLength={1000}
            numberOfLines={4}
          />
          <Text style={styles.errorTextStyle}>{this.state.descriptionError}</Text>
          {this.renderButton()}
        </View>
      )
    }
    return null;
  }

  selectInvited() {
    this.setState({ viewingSubscribed: false }, () => this.fetchLists());
  }

  selectSubscribed() {
    this.setState({ viewingSubscribed: true }, () => this.fetchLists()); 
  }

  render() {
    return(
      <KeyboardAvoidingView 
        style={styles.outerContainer}
        behavior="padding"
      >
        <View style={styles.twoPanelLink}>
          <TouchableOpacity 
            style={this.state.viewingSubscribed ? styles.selectedPanel : styles.unSelectedPanel} 
            onPress={() => this.selectSubscribed()}
          >
            <Text style={this.state.viewingSubscribed ? styles.selectedText : styles.unSelectedText}>Subscribed</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={this.state.viewingSubscribed ? styles.unSelectedPanel : styles.selectedPanel} 
            onPress={() => this.selectInvited()}
          >
            <Text style={this.state.viewingSubscribed ? styles.unSelectedText : styles.selectedText}>Invited</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.viewingSubscribed ? this.props.userCreatedLists : this.props.userInvites}
            renderItem={({item}) => this.state.viewingSubscribed ? <ListItem details={item} /> : <InviteItem details={item} />}
            keyExtractor={(item, _index) => `${item.id}`}
          />
        </View>
        {this.state.viewingSubscribed ? 
          <Button 
            onPress={() => this.setState({ addListDropDown: !this.state.addListDropDown })}
            buttonText={'Add New List'}
          /> :
          null
        }
        {this.renderDropDown()}
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authToken: state.authToken,
    currentUser: state.currentUser,
    userCreatedLists: state.userCreatedLists,
    userInvites: state.userInvites,
  }
}

const styles = {
  dropDownContainer: {
    padding: 30,
    paddingTop: 10,
    alignSelf: 'stretch',
    borderColor: '#003C5A',
    borderWidth: 2,
    borderRadius: 5,
    elevation: 2,
    margin: 20,
    height: 240,
  },
  outerContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  errorTextStyle: {
    color: '#D8000C',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5
  },
  twoPanelLink: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderColor: '#003c5a',
    borderWidth: 2,
    margin: 20,
  },
  selectedPanel: {
    padding: 5,
    backgroundColor: '#003c5a',
    flex: 1,
  },
  selectedText: {
    color: '#c9ddff',
    textAlign: 'center',
  },
  unSelectedPanel: {
    padding: 5,
    backgroundColor: '#c9ddff',
    flex: 1,
  },
  unSelectedText: {
    color: '#003c5a',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  }
}

export default connect(mapStateToProps, actions)(UserLists);