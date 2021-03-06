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
      textColor: COLORS.white,
    },
    secondary: {
      backgroundColor: COLORS.secondary,
      loader: COLORS.white,
      icon: COLORS.white,
      shadowColor: COLORS.secondary,
      textColor: COLORS.white,
    },
    plain: {
      backgroundColor: 'transparent',
      loader: COLORS.white,
      icon: COLORS.white,
      shadowColor: 'transparent',
      textColor: COLORS.white,
    },
    grayPlain: {
      backgroundColor: 'transparent',
      loader: COLORS.gray,
      icon: COLORS.gray,
      shadowColor: 'transparent',
      textColor: COLORS.gray
    },
  }

  return (
    <>
      <TouchableOpacity
        {...props.touchableProps}
        onPress={localPress}
        activeOpacity={props.activeOpacity}
        style={[Styles.buttonContainer, props.containerStyle, { marginHorizontal: props.widthSeparator }]}
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
            <Text style={[Styles.title, { color: theme[props.theme || 'primary'].textColor }]}>{props.title}</Text>
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
  theme?: "primary" | "secondary" | "grayPlain" | "plain";
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
  },
  buttonContent: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: METRICS.medium10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    borderRadius: 5,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
  title: {
    fontSize: FONTS.regular,
  },
  loading: {
    padding: METRICS.small5,
  },
});

export default React.memo(Button)