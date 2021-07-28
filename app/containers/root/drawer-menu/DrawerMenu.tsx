import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { View } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import { navigate, navigateAndReset } from "../../../services/NavigationService";
import { RootState } from '../../../stores/AppReducers';
import SigninActions from "../../../stores/signin/Actions";
import Styles from "./DrawerMenuStyle";

const DrawerMenu = (props: ScreenProps) => {
  return (
    <DrawerContentScrollView {...props} style={Styles.container}>
      <DrawerItem
        label="Ayuda"
        onPress={() => navigate('Help', { previousScreen: "Drawer" })}
        icon={() => <Ionicons name="help-circle-outline" size={14} />}
      />
      <View style={Styles.logoutView}>
        <DrawerItem
          onPress={() => navigateAndReset('Signin')}
          label="Cerrar Sesión"
          icon={() => <Ionicons name="log-out" size={14} />}
        />
      </View>
    </DrawerContentScrollView>
  );
}

interface ScreenProps extends ReduxProps {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
});

const mapDispatchToProps = {
  logout: SigninActions.logout,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(DrawerMenu)