import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ListDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('rendering a list detail')
    console.log(this.props)
    return(
      <View>
        <Text>List {this.props.selectedList}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authToken: state.authToken,
    currentUser: state.currentUser,
    selectedList: state.selectedList,
  }
}

export default connect(mapStateToProps, actions)(ListDetail);