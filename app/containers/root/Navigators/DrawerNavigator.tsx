import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import DrawerMenu from '../drawer-menu/DrawerMenu';

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

export type DrawerNavigatorParamList = {
  Dashboard?: any;
  Drawer?: any;
}

export default DrawerNavigator