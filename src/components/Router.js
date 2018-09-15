import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import HeadingBar from './HeadingBar'
import LoginScreen from './LoginScreen';

class Router extends Component {
  renderScreen() {
    console.log('hello im rendering')
    console.log(this.props)
    if (this.props.authToken) {
      return(
        <HeadingBar headingText={'Coordinator'} />
      )
    }
    return(
      <LoginScreen />
    )
  }

  render() {
    return(
      <View style={styles.containerStyle}>
        {this.renderScreen()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.authToken,
    currentUser: state.currentUser,
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#c9ddff'
  }
}

export default connect(mapStateToProps)(Router);