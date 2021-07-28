import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import React from "react";
import Header from '../../../components/header/Header';
import Example from '../../example/Example';
import SplashScreen from "../splash-screen/SplashScreen";
import DrawerNavigator, { DrawerNavigatorParamList } from './DrawerNavigator';

const Stack = createStackNavigator<StackNavigatorParamList>();
const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="Example" component={Example} />
    </Stack.Navigator>
  );
};

export type StackNavigatorParamList = DrawerNavigatorParamList & {
  SplashScreen?: any;
  Example?: any;
}

export default MainStackNavigator