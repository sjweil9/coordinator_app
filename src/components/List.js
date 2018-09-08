import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import User from './User';
import Task from './Task';

export default class List extends Component {
  constructor(props) {
    super(props)
    this.componentMapping = {
      user: User,
      task: Task,
    }
    this.state = {
      items: []
    }
  }

  componentWillMount() {
    fetch(`http://192.168.1.70:3000/${this.props.itemUrl}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ items: responseJson })
      })
  }

  renderItemList() {
    const ListItem = this.componentMapping[this.props.itemType];
    return this.state.items.map(item => {
      return <ListItem key={item.id} details={item} />
    })
  }

  render() {
    return(
      <ScrollView>
        {this.renderItemList()}
      </ScrollView>
    )
  }
}
