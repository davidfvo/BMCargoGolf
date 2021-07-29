import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import DrawerMenu from '../drawer-menu/DrawerMenu';
import { MainNavigatorParamList } from './MainNavigator';

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();
const DrawerNavigator = () => {
  //Rendering
  const LocalDrawerMenu = (props: any) => {
    return (<DrawerMenu {...props} />)
  }
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={LocalDrawerMenu}
    >
    </Drawer.Navigator>
  );
};

export type DrawerNavigatorParamList = MainNavigatorParamList & {
  Dashboard?: any;
  Drawer?: any;
}

export default DrawerNavigator