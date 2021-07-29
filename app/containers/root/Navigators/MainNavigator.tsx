import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import Example from '../../example/Example';
import SplashScreen from "../splash-screen/SplashScreen";
import DrawerNavigator from './DrawerNavigator';
import UserAccessNavigator from './UserAccessNavigator';

const Stack = createStackNavigator<MainNavigatorParamList>();
const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="Example" component={Example} />
      <Stack.Screen name="UserAccessNavigator" component={UserAccessNavigator} />
    </Stack.Navigator>
  );
};

export type MainNavigatorParamList = {
  SplashScreen?: any;
  Example?: any;
  Dashboard?: any;
  Drawer?: any;
  UserAccessNavigator?: any;
}

export default MainStackNavigator