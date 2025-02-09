import React, { Component } from "react";
import NavigationService from "App/Services/NavigationService";
import AppNavigator from "App/Navigators/AppNavigator";
import { View, Text } from "react-native";
import styles from "./RootScreenStyle";
import { connect } from "react-redux";
import StartupActions from "App/Stores/Startup/Actions";
import { PropTypes } from "prop-types";

class RootScreen extends Component {
  constructor() {
    super();
    this.state = {
      newJWT: ""
    };
  }

  componentDidMount() {
    // Run the startup saga when the application is starting
    this.props.startup();
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          
        />
      </View>
    );
  }
}

RootScreen.propTypes = {
  startup: PropTypes.func
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen);
