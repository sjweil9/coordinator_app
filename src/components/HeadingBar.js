import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Hamburger from 'react-native-hamburger';
import HamburgerButton from './common/HamburgerButton';
import { connect } from 'react-redux';
import * as actions from '../actions';

class HeadingBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hamburgerActive: false,
    }
  }

  renderDropDown() {
    if (this.state.hamburgerActive) {
      return(
        <View style={styles.dropDownContainer}>
          <HamburgerButton
            buttonText={'Lists'}
            onPress={() => null}
          />
          <HamburgerButton
            buttonText={'Friends'}
            onPress={() => null}
          />
          <HamburgerButton
            buttonText={'Profile'}
            onPress={() => null}
          />
          <HamburgerButton
            buttonText={'Log Out'}
            onPress={() => this.props.setAuthToken(null)}
          />
        </View>
      )
    }
    return null;
  }
  
  render() {
    return(
      <View>
        <View style={styles.viewStyles}>
          <View style={styles.hamburgerWrapper}>
            <Hamburger 
              active={this.state.hamburgerActive}
              type="spinCross"
              color="#c9ddff"
              onPress={() => this.setState({ hamburgerActive: !this.state.hamburgerActive})}
            />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.textStyles}>{this.props.headingText}</Text>
          </View>
        </View>
        {this.renderDropDown()}
      </View>   
    )
  }
}

const styles = {
  textStyles: {
    fontSize: 30,
    color: '#c9ddff',
    alignSelf: 'center'
  },
  viewStyles: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingLeft: 15,
    paddingBottom: 15,
    backgroundColor: '#003C5A'
  },
  hamburgerWrapper: {
    flex: 1
  },
  textWrapper: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropDownContainer: {
    alignSelf: 'stretch',
    elevation: 2,
    borderColor: '#003c5a'
  }
};

export default connect(null, actions)(HeadingBar);
