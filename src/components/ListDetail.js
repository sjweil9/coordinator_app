import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { CardSection, Spinner } from './common';
import Task from './Task';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ListDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listDetails: null,
      listTasks: [],
      addingTask: false,
    }
  }

  componentWillMount() {
    fetch(`http://192.168.1.72:3000/lists/${this.props.selectedList}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.authToken,
    }}).then(response => response.json())
    .then(responseJSON => {
      if (responseJSON.code && responseJSON.code != 200) {
        // handle error on list details
        console.log(responseJSON);
      }
      else {
        this.setState({
          ...this.state,
          listDetails: responseJSON,
          listTasks: responseJSON.tasks || [],
        });
      }
    }).catch(error => {
      // handle error
      console.log(error);
    });
  }

  renderTasks() {
    return(
      <View style={styles.listContainer}>
        <FlatList
          data={this.state.listTasks}
          renderItem={({item}) => <Task details={item} />}
          keyExtractor={(item, _index) => `${item.id}`}
        />
      </View>
    )
  }

  render() {
    if (this.state.listDetails) {
      const { id, title, description, created_user } = this.state.listDetails;

      return(
        <View style={styles.outerContainer}>
          <View style={styles.listHeader}>
            <CardSection bottomBorder={true}>
              <Text style={styles.titleText}>{title}</Text>
            </CardSection>
            <CardSection bottomBorder={true}>
              <Text style={styles.descriptionText}>{description}</Text>
            </CardSection>
            <CardSection>
              <Text style={styles.createdByText}>Created By: {created_user.first_name} {created_user.last_name}</Text>
            </CardSection>
            <CardSection>
              <Text style={styles.createdByText}>Collaborators: </Text>
            </CardSection>
          </View>
          <Text style={styles.taskLabel}>--- Tasks ---</Text>
          {this.renderTasks()}
        </View>
      )
    }

    else {
      return(
        <View style={styles.spinnerContainer}>
          <Spinner size={'large'} />
        </View>
      )
    }
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

const styles = {
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  listHeader: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  titleText: {
    fontSize: 24,
    color: '#003C5A',
    alignSelf: 'stretch',
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 18,
    color: '#003C5A',
  },
  createdByText: {
    fontSize: 14,
    color: '#003c5a',
  },
  spinnerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  taskLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#003C5A',
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  }
}

export default connect(mapStateToProps, actions)(ListDetail);