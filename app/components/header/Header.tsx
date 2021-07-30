import React, { FunctionComponent } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, StyleProp, ViewProps, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goBack } from '../../services/NavigationService';
import CheckRender from '../security/CheckRender';
import { FONTS, METRICS, COLORS } from '../../themes';
import { horizontalScale } from '../../utils/StyleHelpers';

const Header: FunctionComponent<propTypes> = props => {
  const onPressIcon = () => {
    if (typeof props.onPressLeftIcon == 'function') {
      props.onPressLeftIcon();
    } else {
      goBack();
    }
  }

  const onPressRightIcon = () => {
    if (typeof props.onPressRightIcon == 'function') {
      props.onPressRightIcon();
    } else {
      return
    }
  }

  const hitslop = { top: 10, right: 20, bottom: 10, left: 20 }

  return (
    <View style={[Styles.header, props.containerStyle]}>
      <View style={Styles.headerLeftView}>
        <TouchableOpacity
          onPress={onPressIcon}
          hitSlop={hitslop}
        >
          <CheckRender allowed={props.leftIcon}>
            <Ionicons name={props.iconName || "chevron-back"} size={FONTS.mediumIcon} color={props.leftIconColor || COLORS.white} />
          </CheckRender>
        </TouchableOpacity>
      </View>
      <View
        style={Styles.body}
      >
        <Text style={Styles.headerTitleText}>
          {props.title}
        </Text>
      </View>
      <View style={Styles.headerRightView}>
        <CheckRender allowed={props.rightIcon}>
          <TouchableOpacity onPress={onPressRightIcon}>
            {props.rightIcon}
          </TouchableOpacity>
        </CheckRender>
      </View>
    </View>
  );
}

interface propTypes {
  title?: string;
  iconType?: string;
  iconName?: string;
  rightIcon?: any;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  leftIcon?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  leftIconColor?: string;
}

Header.defaultProps = {
  iconName: undefined,
  iconType: undefined,
  rightIcon: undefined,
  onPressLeftIcon: () => goBack(),
  onPressRightIcon: () => console.log('pressed'),
  containerStyle: {
    backgroundColor: COLORS.primary,
  },
};

const Styles = StyleSheet.create({
  header: {
    paddingHorizontal: horizontalScale(METRICS.medium10),
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftView: {
    flex: 0,
    justifyContent: 'center',
    minWidth: 30,
  },
  body: {
    flex: 1,
    paddingLeft: METRICS.large15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: FONTS.large,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  headerRightView: {
    flex: 0,
    justifyContent: 'center',
    minWidth: 30,
  },
  headerTitleIcon: {
    fontSize: FONTS.largeIcon,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default Header;