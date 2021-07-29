import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import Signin from '../../user-access/signin/Signin';
import Signup from '../../user-access/signup/Signup';
import Welcome from '../../user-access/welcome/Welcome';
import { MainNavigatorParamList } from './MainNavigator';

const Stack = createStackNavigator<UserAccessNavigatorParamList>();
const UserAccessNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export type UserAccessNavigatorParamList = MainNavigatorParamList & {
  Welcome?: any;
  Signin?: any;
  Signup?: any
}

export default UserAccessNavigator