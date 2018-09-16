import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import User from './User';
import Task from './Task';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import * as actions from '../actions';

class List extends Component {
  constructor(props) {
    super(props)
    this.componentMapping = {
      user: User,
      task: Task,
      list: ListItem,
    }
    this.props.setUserCreatedLists = this.props.setUserCreatedLists.bind(this);
  }

  componentWillMount() {
    console.log('making list API call')
    fetch(`http://192.168.1.72:3000/${this.props.itemUrl}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
    }}).then(response => response.json())
    .then(responseJSON => {
      if (responseJSON.code && responseJSON.code != 200) {
        console.log(responseJSON);
      }
      else {
        console.log(`response from list api call`);
        console.log(responseJSON);
        console.log(`props after list api call`)
        console.log(this.props)
        this.props.setUserCreatedLists(responseJSON);
        console.log('props after calling setUserCreatedLists')
        console.log(this.props);
      }
    });
  }

  render() {
    console.log('rendering list')
    console.log(this.props)
    const ListItemType = this.componentMapping[this.props.itemType];

    return(
      <View style={styles.listContainer}>
        <FlatList
          data={this.props.userCreatedLists}
          renderItem={({item}) => <ListItemType details={item} />}
          keyExtractor={(item, _index) => `${item.id}`}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('map state to props')
  console.log(state);
  console.log(ownProps)
  return {
    ...ownProps,
    authToken: state.authToken,
    currentUser: state.currentUser,
    userCreatedLists: state.userCreatedLists,
  }
}

const styles = {
  listContainer: {
    flex: 1,
    marginBottom: 20,
  }
}

export default connect(mapStateToProps, actions)(List);