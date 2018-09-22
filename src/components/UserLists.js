import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import List from './List';
import { Button, TextField, Spinner } from './common'

class UserLists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addListDropDown: false,
      listTitle: '',
      listDescription: '',
      loading: false,
      descriptionError: '',
      titleError: ''
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

  render() {
    return(
      <View style={styles.outerContainer}>
        <List itemUrl={'lists'} itemType={'list'} />
        <Button 
          onPress={() => this.setState({ addListDropDown: !this.state.addListDropDown })}
          buttonText={'Add New List'}
        />
        {this.renderDropDown()}
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authToken: state.authToken,
    currentUser: state.currentUser,
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
  }
}

export default connect(mapStateToProps, actions)(UserLists);