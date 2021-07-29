import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isMountedRef, navigationRef } from "../../services/NavigationService";
import StartupActions from "../../stores/startup/Actions";
import MainStackNavigator from "./Navigators/MainNavigator";

const RootScreen = (props) => {
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  useEffect(() => {
    props.startup()
  }, [])

  const onStateChange = (state) => {
    console.log('New Nav state is', state)
  }

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <MainStackNavigator />
    </NavigationContainer>
  )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  startup: StartupActions.startup,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen);