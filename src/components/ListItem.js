import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { CardSection } from './common';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.props.setSelectedList = this.props.setSelectedList.bind(this);
    this.jumpToListDetail = this.jumpToListDetail.bind(this);
  }

  jumpToListDetail() {
    console.log(this.props.details.id);
    this.props.setSelectedList(this.props.details.id);
    console.log(this.props)
    this.props.movePageForward('list_detail');
  }

  render() {
    console.log('rendering a list item')
    console.log(this.props.details)
    const { id, title, description, created_user } = this.props.details;
    return(
      <TouchableOpacity style={styles.rowWrapper} onPress={() => this.jumpToListDetail()}>
        <CardSection bottomBorder={true}>
          <Text style={styles.titleText}>{title}</Text>
        </CardSection>
        <CardSection bottomBorder={true}>
          <Text style={styles.descriptionText}>{description}</Text>
        </CardSection>
        <CardSection>
          <Text style={styles.createdByText}>Created By: {created_user.first_name} {created_user.last_name}</Text>
        </CardSection>
      </TouchableOpacity>
    )
  }
};

const styles = {
  rowWrapper: {
    backgroundColor: '#95afdb',
    borderColor: '#003C5A',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  titleText: {
    fontSize: 18,
    color: '#003C5A',
    alignSelf: 'stretch',
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    color: '#003C5A',
  },
  createdByText: {
    fontSize: 10,
    color: '#003c5a',
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

export default connect(mapStateToProps, actions)(ListItem);
