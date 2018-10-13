import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import HeadingBar from './HeadingBar'
import LoginScreen from './LoginScreen';
import UserLists from './UserLists';
import ListDetail from './ListDetail';
import FriendsPage from './FriendsPage';
import * as actions from '../actions';
import { Spinner } from './common';
import Config from '../../config/config';

class Router extends Component {
  setUserProfile() {
    fetch(`https://${Config.API_BASE}/users/current`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
      }
    }).then(response => response.json())
    .then(responseJSON => {
      this.setState({ loading: false });
      if (responseJSON.code && responseJSON.code != 200) {
        console.log(responseJSON);
        this.props.setAuthToken(null);
      }
      else {
        this.props.setCurrentUser(responseJSON);
      }
    })
    .catch(error => {
      console.log(error);
      this.props.setAuthToken(null);
    });
  }

  renderScreen() {
    if (this.props.authToken) {
      if (this.props.currentUser) {
        return(
          <View style={styles.containerStyle}>
            <HeadingBar headingText={'Coordinator'} />
            {this.renderSelectedScreen()}
          </View>
        )
      }
      else {
        this.setUserProfile();
        return(
          <Spinner size="large" />
        )
      }
    }
    return(
      <LoginScreen />
    )
  }

  renderSelectedScreen() {
    switch(this.props.selectedScreen[this.props.selectedScreen.length - 1]) {
      case 'user_lists':
        return(
          <UserLists />
        )
      case 'list_detail':
        return(
          <ListDetail />
        )
      case 'friends':
        return(
          <FriendsPage />
        )
      default:
        return null
    }
  }

  render() {
    return(
      <View style={styles.containerStyle}>
        {this.renderScreen()}
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authToken: state.authToken,
    currentUser: state.currentUser,
    selectedScreen: state.selectedScreen,
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#c9ddff',
    justifyContent: 'center',
  }
}

export default connect(mapStateToProps, actions)(Router);