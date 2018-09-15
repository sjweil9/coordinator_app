import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Button, TextField, Spinner } from './common';
import * as actions from '../actions';
import { connect } from 'react-redux';

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
    fetch('http://192.168.1.72:3000/login', {
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
      console.log(responseJSON.code);
      if (responseJSON.code && responseJSON.code != 200) {
        this.setState({ error: responseJSON.messages[0].credentials });
      }
      else {
        console.log('im here')
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
      <Button onPress={this.sendLoginRequest}>
          <Text style={styles.buttonTextStyle}>LOG IN</Text>
      </Button>
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
        <View style={styles.innerContainerStyle}>
          <TextField
            value={this.state.email}
            placeholder='Email Address'
            onChangeText={email => this.setState({ email })}
            autoCorrect={false}
            textContentType="emailAddress"
          />
          <TextField
            value={this.state.password}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            autoCorrect={false}
            textContentType="password"
          />
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        </View>
        {this.renderButton()}
      </View>
    )
  }
}

const styles = {
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: 24,
    color: '#c9ddff'
  },
  logoStyle: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  innerContainerStyle: {
    height: 100,
  },
  outerContainerStyle: {
    marginTop: 25,
    flex: 1,
    padding: 25,
    flexDirection: 'column',
    justifyContent: 'space-around'
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

export default connect(null, actions)(LoginScreen);