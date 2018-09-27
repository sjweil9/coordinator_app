import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button, TextField, Spinner } from './common';
import User from './User';

class FriendsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewingCurrent: true,
      currentFriends: [],
      otherUsers: [],
    }
  }

  componentWillMount() {
    this.fetchFriends(); 
  }

  fetchFriends() {
    status_parameter = this.state.viewingCurrent ? 'true' : 'false';
    console.log('fetching friends');
    fetch(`http://192.168.1.72:3000/users/${this.props.currentUser.id}/friends?accepted=${status_parameter}`, {
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
        this.setState({ currentFriends: responseJSON });
      }
    }).catch(error => {
      // handle error
      console.log(error);
    });
  }

  selectCurrent() {
    this.setState({ viewingCurrent: true }, () => this.fetchFriends()); 
  }

  selectFind() {
    this.setState({ viewingCurrent: false }, () => this.fetchFriends()); 
  }

  renderFriendsList() {
    const labelText = this.state.viewingCurrent ? 'Current Friends' : 'Pending Friends'
    return(
      <View>
        <Text style={styles.listLabelText}>{labelText}</Text>
        <FlatList
          data={this.state.currentFriends}
          renderItem={({item}) => <User details={item} />}
          keyExtractor={(item, _index) => `${item.id}`}
        />
      </View>
    )
  }

  render() {
    return(
      <View style={styles.outerContainer}>
        <View style={styles.twoPanelLink}>
          <TouchableOpacity 
            style={this.state.viewingCurrent ? styles.selectedPanel : styles.unSelectedPanel} 
            onPress={() => this.selectCurrent()}
          >
            <Text style={this.state.viewingCurrent ? styles.selectedText : styles.unSelectedText}>Current</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={this.state.viewingCurrent ? styles.unSelectedPanel : styles.selectedPanel} 
            onPress={() => this.selectFind()}
          >
            <Text style={this.state.viewingCurrent ? styles.unSelectedText : styles.selectedText}>Search</Text>
          </TouchableOpacity>
        </View>
        {this.renderFriendsList()}
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
  outerContainer: {
    flex: 1,
    padding: 10,
  },
  listLabelText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
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
}

export default connect(mapStateToProps, actions)(FriendsPage);