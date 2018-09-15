import React from 'react';
import Router from './src/components/Router'
import List from './src/components/List';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <Router />
      </Provider>
    );
  }
}

// <List itemUrl={'tasks'} itemType={'task'} />