import React from 'react';
import Router from './src/components/Router'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import ActionCableProvider from 'react-actioncable-provider';
import RNActionCable from 'react-native-actioncable';

RNActionCable.startDebugging()
const cable = RNActionCable.createConsumer('ws://192.168.1.72:3000/cable');

export default class App extends React.Component {
  render() {
    return (
      <ActionCableProvider cable={cable}>
        <Provider store={createStore(reducers)}>
          <Router />
        </Provider>
      </ActionCableProvider>
    );
  }
}
