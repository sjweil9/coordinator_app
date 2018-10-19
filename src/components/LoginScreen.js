import React, { Component } from 'react';
import { Text, View, Image, KeyboardAvoidingView, Alert, Dimensions, ScrollView } from 'react-native';
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
      first_name: '',
      last_name: '',
      password_confirmation: '',
      loading: false,
      loginOption: true,
      registrationErrors: {},
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

  sendRegistrationRequest() {
    if (this.state.password != this.state.password_confirmation) {
      Alert.alert(
        'Error',
        `Password does not match confirmation`,
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: true }
      )
      return null;
    }
    this.setState({ registrationErrors: {}, loading: true });
    fetch(`https://${Config.API_BASE}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
      }),
    }).then(response => response.json())
    .then(responseJSON => {
      this.setState({ loading: false });
      if (responseJSON.code && responseJSON.code != 200) {
        this.setState({ registrationErrors: responseJSON.messages });
      }
      else {
        this.sendLoginRequest();
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
        onPress={() => this.state.loginOption ? this.sendLoginRequest() : this.sendRegistrationRequest() }
        buttonText={this.state.loginOption ? 'LOG IN' : 'REGISTER'} 
      />
    )
  }

  renderRegistrationFields() {
    return(
      <View>
        <TextField
          value={this.state.password_confirmation}
          placeholder='Confirm Password'
          onChangeText={password_confirmation => this.setState({ password_confirmation })}
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          placeholderTextColor='#003C5A'
          onBlur={() => this.setState({ password_confirmation: this.state.password_confirmation.trim() })}
        />
        {this.renderConfirmationError()}
        {this.state.registrationErrors.password_confirmation ? <Text style={styles.errorTextStyle}>{this.state.registrationErrors.password_confirmation[0]}</Text> : null}
        <TextField
          value={this.state.first_name}
          placeholder='First Name'
          onChangeText={first_name => this.setState({ first_name })}
          autoCorrect={false}
          placeholderTextColor='#003C5A'
          onBlur={() => this.setState({ first_name: this.state.first_name.trim() })}
        />
        {this.state.registrationErrors.first_name ? <Text style={styles.errorTextStyle}>{this.state.registrationErrors.first_name[0]}</Text> : null}
        <TextField
          value={this.state.last_name}
          placeholder='Last Name'
          onChangeText={last_name => this.setState({ last_name })}
          autoCorrect={false}
          placeholderTextColor='#003C5A'
          onBlur={() => this.setState({ last_name: this.state.last_name.trim() })}
        />
        {this.state.registrationErrors.last_name ? <Text style={styles.errorTextStyle}>{this.state.registrationErrors.last_name[0]}</Text> : null}
      </View>
    )
  }

  renderConfirmationError() {
    if (this.state.password_confirmation == '' || this.state.password_confirmation == this.state.password || this.state.loginOption) {
      return null;
    }
    return(
      <Text style={styles.errorTextStyle}>Confirmation does not match password</Text>
    )
  }

  render() {
    return(
      <KeyboardAvoidingView style={styles.outerContainerStyle} behavior="padding">
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.innerContainerStyle}>
            <Image 
              source={require('../../assets/images/cloud.png')} 
              style={styles.logoStyle}
            />
            <Text style={styles.appNameStyle}>Coordinator</Text>
          </View>
          <View style={styles.inputsContainerStyle}>
            <TextField
              value={this.state.email}
              placeholder='Email Address'
              onChangeText={email => this.setState({ email })}
              autoCorrect={false}
              textContentType="emailAddress"
              placeholderTextColor='#003C5A'
              onBlur={() => this.setState({ email: this.state.email.trim() })}
            />
            {this.state.registrationErrors.email ? <Text style={styles.errorTextStyle}>{this.state.registrationErrors.email[0]}</Text> : null}
            <TextField
              value={this.state.password}
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
              autoCorrect={false}
              textContentType="password"
              placeholderTextColor='#003C5A'
              onBlur={() => this.setState({ password: this.state.password.trim() })}
            />
            {this.state.registrationErrors.password ? <Text style={styles.errorTextStyle}>{this.state.registrationErrors.password[0]}</Text> : null}
            {this.state.loginOption ? null : this.renderRegistrationFields()}
            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            {this.renderButton()}
          </View>
        </ScrollView>
        <View style={styles.bottomContainerStyle}>
          <Button
            onPress={() => this.setState({
              loginOption: !this.state.loginOption,
              registrationErrors: {},
              error: ''
              })}
            buttonText={this.state.loginOption ? 'Need a new account?' : 'Already have an account?'}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const { width, height } = Dimensions.get('window');

const styles = {
  logoStyle: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  innerContainerStyle: {},
  inputsContainerStyle: {
    marginTop: 25,
  },
  bottomContainerStyle: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: width,
  },
  outerContainerStyle: {
    marginTop: 25,
    flex: 1,
    padding: 25,
    flexDirection: 'column',
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