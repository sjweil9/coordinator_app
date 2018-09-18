import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import HeadingBar from './HeadingBar'
import LoginScreen from './LoginScreen';
import UserLists from './UserLists';
import ListDetail from './ListDetail';
import * as actions from '../actions';

class Router extends Component {
  componentWillMount() {
    if (this.props.authToken && !this.props.currentUser) {
      this.setUserProfile();
    }
  }

  setUserProfile() {
    fetch('http://192.168.1.72:3000/users/current', {
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
        this.setAuthToken(null);
      }
      else {
        this.props.setCurrentUser(responseJSON);
      }
    })
    .catch(error => {
      this.setAuthToken(null);
    });
  }

  renderScreen() {
    if (this.props.authToken) {
      return(
        <View style={styles.containerStyle}>
          <HeadingBar headingText={'Coordinator'} />
          {this.renderSelectedScreen()}
        </View>
      )
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
    backgroundColor: '#c9ddff'
  }
}

export default connect(mapStateToProps, actions)(Router);