import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import RNSplashScreen from 'react-native-splash-screen';
import Content from '../../../components/content/Content';
import { useFocusEffect } from '@react-navigation/core';
import { isMountedRef, navigateAndReset } from "../../../services/NavigationService";
import { COLORS, METRICS } from "../../../themes";

const SplashScreen = (props: any) => {
  useFocusEffect(
    useCallback(() => {
      RNSplashScreen.hide()
      setTimeout(() => navigateAndReset('Example'), 1000)
      return () => { }
    }, [props.navigation, isMountedRef])
  )

  return (
    <Content
      color={COLORS.primary}
      contentContainerStyle={Styles.content}
    >
      <View style={Styles.logoContainer}>
      </View>
    </Content>
  );
}

const Styles = StyleSheet.create({
  content: {
    paddingVertical: METRICS.medium10,
    paddingHorizontal: METRICS.large15,
  },
  logoContainer: {
    marginTop: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 130,
    height: 130,
  }
});

export default SplashScreen