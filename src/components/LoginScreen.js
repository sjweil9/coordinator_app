import React, { Component } from 'react';
import { Text, View, Image, KeyboardAvoidingView } from 'react-native';
import { Button, TextField, Spinner } from './common';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Config from '../../config/config';

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
    }
    this.sendLoginRequest = this.sendLoginRequest.bind(this);
  }

  sendLoginRequest() {
    this.setState({ error: '', loading: true });
    fetch(`https://${Config.API_BASE}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then(response => response.json())
    .then(responseJSON => {
      this.setState({ loading: false });
      if (responseJSON.code && responseJSON.code != 200) {
        this.setState({ error: responseJSON.messages[0].credentials });
      }
      else {
        this.props.setAuthToken(responseJSON.access_token);
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
      <Button onPress={this.sendLoginRequest} buttonText={'LOG IN'} />
    )
  }

  render() {
    return(
      <View style={styles.outerContainerStyle}>
        <View style={styles.innerContainerStyle}>
          <Image 
            source={{ uri: 'https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/cloud_text-512.png' }} 
            style={styles.logoStyle}
          />
          <Text style={styles.appNameStyle}>Coordinator</Text>
        </View>
        <KeyboardAvoidingView 
          style={styles.innerContainerStyle}
          behavior="padding"
        >
          <TextField
            value={this.state.email}
            placeholder='Email Address'
            onChangeText={email => this.setState({ email })}
            autoCorrect={false}
            textContentType="emailAddress"
            placeholderTextColor='#003C5A'
          />
          <TextField
            value={this.state.password}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            autoCorrect={false}
            textContentType="password"
            placeholderTextColor='#003C5A'
          />
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        </KeyboardAvoidingView>
        <View style={styles.innerContainerStyle}>
          {this.renderButton()}
        </View>
      </View>
    )
  }
}

const styles = {
  logoStyle: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  innerContainerStyle: {
    flex: 1,
  },
  outerContainerStyle: {
    marginTop: 25,
    flex: 1,
    padding: 25,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  appNameStyle: {
    color: '#003C5A',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  errorTextStyle: {
    color: '#D8000C',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5
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

export default connect(mapStateToProps, actions)(LoginScreen);