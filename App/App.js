import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import createStore from "App/Stores";
import RootScreen from "./Containers/Root/RootScreen";
import DeviceStorage from "App/Services/DeviceStorage";
import "react-native-gesture-handler";

const { store, persistor } = createStore();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      jwt: ""
    };

    this.newJWT = this.newJWT.bind(this);
    this.deleteJWT = DeviceStorage.deleteJWT.bind(this);
    this.loadJWT = DeviceStorage.loadJWT.bind(this);
    this.loadJWT();
  }

  newJWT(jwt) {
    this.setState({
      jwt: jwt
    });
  }

  render() {
    return (
      /**
       * @see https://github.com/reduxjs/react-redux/blob/master/docs/api/Provider.md
       */
      <Provider store={store}>
        {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
        <PersistGate loading={null} persistor={persistor}>
          <RootScreen newJWT={this.newJWT} />
        </PersistGate>
      </Provider>
    );
  }
}
