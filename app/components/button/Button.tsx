import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../themes';
import Colors from '../../themes/Colors';
import Loading from '../loading/Loading';
import Separator from '../separator/Separator';
import CheckRender from '../security/CheckRender';
import { horizontalScale, viewportWidth } from '../../utils/StyleHelpers';
import Text from '../text/Text';

const Button: FunctionComponent<propTypes> = (props) => {
  const localPress = () => {
    if (props.isLoading || props.disabled) {
      return () => { }
    } else if (typeof props.onPress === 'function') {
      return props.onPress()
    } else {
      return () => { }
    }
  }

  interface themeProps {
    [key: string]: any
  }

  const theme: themeProps = {
    primary: {
      backgroundColor: COLORS.primary,
      loader: COLORS.white,
      icon: COLORS.white,
      shadowColor: COLORS.primary,
      marginHorizontal: props.widthSeparator,
    },
    secondary: {
      backgroundColor: COLORS.secondary,
      loader: COLORS.white,
      icon: COLORS.white,
      shadowColor: COLORS.secondary,
      marginHorizontal: props.widthSeparator,
    },
    plain: {
      backgroundColor: 'transparent',
      loader: COLORS.white,
      icon: COLORS.white,
      shadowColor: 'transparent',
      marginHorizontal: props.widthSeparator,
    },
  }

  return (
    <>
      <TouchableOpacity
        {...props.touchableProps}
        onPress={localPress}
        activeOpacity={props.activeOpacity}
        style={[Styles.buttonContainer, props.containerStyle]}
        disabled={props.disabled || props.isLoading}
      >
        <View
          style={[
            Styles.buttonContent,
            theme[props.theme || 'primary'],
            props.contentStyle,
          ]}>
          <CheckRender allowed={props.isLoading}>
            <Loading
              size="small"
              color={Colors.white}
              style={Styles.loading}
            />
          </CheckRender>
          <CheckRender allowed={!props.isLoading}>
            <Text style={Styles.title}>{props.title}</Text>
            <CheckRender allowed={!!props.children}>
              {props.children}
            </CheckRender>
          </CheckRender>
        </View>
      </TouchableOpacity>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </>
  );
};

interface propTypes {
  isLoading?: boolean;
  onPress?: any;
  title: string;
  widthSeparator?: number;
  buttonHeight?: number;
  activeOpacity?: number;
  touchableProps?: TouchableOpacityProps;
  contentStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  bottomSeparate?: boolean;
  theme?: "primary" | "secondary" | "plain";
  children?: JSX.Element | JSX.Element[] | undefined;
}

Button.defaultProps = {
  isLoading: false,
  onPress: () => { },
  title: 'Crear o Consultar',
  widthSeparator: horizontalScale(METRICS.large15),
  buttonHeight: 64,
  activeOpacity: 0.2,
  children: undefined,
  bottomSeparate: true,
  theme: 'primary'
}

const Styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    minHeight: 60,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: METRICS.medium10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
  title: {
    color: Colors.white,
    fontSize: FONTS.regular,
  },
  loading: {
    padding: METRICS.small5,
  },
});

export default React.memo(Button)