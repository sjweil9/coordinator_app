import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { TextField, Spinner } from './common';
import User from './User';
import Config from '../../config/config';

class FriendsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewingCurrent: true,
      currentFriends: [],
      otherUsers: [],
      loading: false,
      searchEntry: '',
      pendingFriendRequests: [],
      loadingPendingFriendRequests: false,
    }
  }

  componentWillMount() {
    this.fetchFriends();
    this.fetchFriendRequests();
  }

  fetchFriends() {
    this.setState({ loading: true });
    status_parameter = this.state.viewingCurrent ? 'true' : 'false';
    console.log('fetching friends');
    fetch(`https://${Config.API_BASE}/users/${this.props.currentUser.id}/friends?accepted=${status_parameter}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
    }}).then(response => response.json())
    .then(responseJSON => {
      this.setState({ loading: false });
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
      this.setState({ loading: false });
    });
  }

  fetchFriendRequests() {
    this.setState({ loadingPendingFriendRequests: true });
    fetch(`https://${Config.API_BASE}/users/${this.props.currentUser.id}/friends/pending`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
    }}).then(response => response.json())
    .then(responseJSON => {
      this.setState({ loadingPendingFriendRequests: false });
      if (responseJSON.code && responseJSON.code != 200) {
        // handle error on list details
        console.log(responseJSON);
      }
      else {
        console.log(responseJSON);
        this.setState({ pendingFriendRequests: responseJSON });
      }
    }).catch(error => {
      // handle error
      console.log(error);
      this.setState({ loadingPendingFriendRequests: false });
    });
  }

  fetchOtherUsers() {
    const { searchEntry } = this.state;
    fetch(`https://${Config.API_BASE}/users/${this.props.currentUser.id}/not_friends?search=${searchEntry}`, {
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
        this.setState({ otherUsers: responseJSON });
      }
    }).catch(error => {
      // handle error
      console.log(error);
    });
  }

  selectCurrent() {
    this.setState({ viewingCurrent: true, currentFriends: [] }, () => { this.fetchFriends(); this.fetchFriendRequests() }); 
  }

  selectFind() {
    this.setState({ viewingCurrent: false, currentFriends: [] }, () => { 
      this.fetchFriends();
      this.fetchOtherUsers(); 
    }); 
  }

  sendFriendRequest(user_id) {
    fetch(`https://${Config.API_BASE}/users/${this.props.currentUser.id}/friends`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
      },
      body: JSON.stringify({ friend_id: user_id }),
    }).then(response => response.json())
    .then(responseJSON => {
      if (responseJSON.code && responseJSON.code != 201) {
        // handle error
      }
      else {
        this.fetchFriends();
        remaining_users = this.state.otherUsers.filter(user => user.id !== user_id);
        this.setState({ otherUsers: remaining_users });
      }
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
  }

  acceptFriendRequest(friendship_id) {
    fetch(`https://${Config.API_BASE}/friendships/${friendship_id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
      },
      body: JSON.stringify({ accepted: true }),
    }).then(response => response.json())
    .then(responseJSON => {
      if (responseJSON.code && responseJSON.code != 201) {
        // handle error
      }
      else {
        this.fetchFriends();
        remaining_requests = this.state.pendingFriendRequests.filter(request => request.id !== friendship_id);
        this.setState({ pendingFriendRequests: remaining_requests });
      }
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
  }

  renderFriendsList() {
    if (this.state.loading) {
      return <Spinner size="large" />
    }
    else if (this.state.currentFriends.length == 0) {
      return null;
    }
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

  renderSearchBar() {
    if (this.state.viewingCurrent) {
      return null;
    }
    return(
      <View style={styles.searchBarContainer}>
        <Text style={styles.listLabelText}>Search for Friends</Text>
        <View style={styles.searchBarWrapper}>
          <TextField
            value={this.state.searchEntry}
            placeholder='Search by Name or Email'
            onChangeText={searchEntry => this.setState({ searchEntry }, () => this.fetchOtherUsers())}
            autoCorrect={false}
            placeholderTextColor='#003C5A'
            maxLength={50}
          />
        </View>
        <FlatList 
          data={this.state.otherUsers}
          renderItem={({item}) => <TouchableOpacity onPress={() => this.sendFriendRequest(item.id)}><User details={item} /></TouchableOpacity>}
          keyExtractor={(item, _index) => `${item.id}`}
        />
      </View>
    )
  }

  renderPendingFriendRequests() {
    if (this.state.loadingPendingFriendRequests) {
      return(
        <View style={styles.searchBarContainer}>
          <Spinner size="large" />
        </View>
      )
    }
    return(
      <View style={styles.searchBarContainer}>
        <Text style={styles.listLabelText}>Pending Friend Requests</Text>
        <FlatList 
          data={this.state.pendingFriendRequests}
          renderItem={({item}) => <TouchableOpacity onPress={() => this.acceptFriendRequest(item.id)}><User details={item.user} /></TouchableOpacity>}
          keyExtractor={(item, _index) => `${item.id}`}
        />
      </View>
    )
  }

  render() {
    return(
      <KeyboardAvoidingView style={styles.outerContainer} behavior="padding">
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
        {this.state.viewingCurrent ? this.renderPendingFriendRequests() : this.renderSearchBar()}
      </KeyboardAvoidingView>
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
  searchBarWrapper: {
    alignSelf: 'stretch',
    margin: 20,
    justifyContent: 'center',
  },
  searchBarContainer: {
    flex: 1,
    paddingBottom: 20,
  }
}

export default connect(mapStateToProps, actions)(FriendsPage);