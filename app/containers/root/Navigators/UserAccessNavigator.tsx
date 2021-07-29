import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import Signin from '../../user-access/signin/Signin';
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
    </Stack.Navigator>
  );
};

export type UserAccessNavigatorParamList = MainNavigatorParamList & {
  Welcome?: any;
  Signin?: any;
}

export default UserAccessNavigator