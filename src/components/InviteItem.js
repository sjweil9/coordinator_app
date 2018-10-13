import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { CardSection, Spinner } from './common';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Config from '../../config/config';

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitting: false
    }
  }

  acceptInvitation() {
    this.setState({ submitting: true });
    fetch(`https://${Config.API_BASE}/users/${this.props.currentUser.id}/invites/${this.props.details.id}/accepted`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
      },
      body: JSON.stringify({ accepted: true })
    }).then(response => response.json())
      .then(responseJSON => {
        this.setState({ submitting: false })
        if (responseJSON.code && responseJSON.code != 200) {
          // handle error on list details
        }
        else {
          this.props.removeUserInvite(this.props.details.id);
        }
      }).catch(error => {
        this.setState({ submitting: false })
        console.log(error);
    });
  }

  render() {
    const { id, title, description, created_user } = this.props.details.list;
    if (this.state.submitting) {
      return(
        <Spinner size="large" />
      )
    }
    return(
      <TouchableOpacity style={styles.rowWrapper} onPress={() => this.acceptInvitation()}>
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
