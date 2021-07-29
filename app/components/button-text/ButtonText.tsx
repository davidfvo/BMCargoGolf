import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../themes';
import { horizontalScale } from '../../utils/StyleHelpers';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';
import Text from '../text/Text';

const ButtonText: FunctionComponent<propTypes> = (props) => {
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
    secondary: {
      textColor: COLORS.secondary
    },
    grayPlain: {
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
        <Text style={[Styles.title, { color: theme[props.theme || 'primary'].textColor }]}>{props.title}</Text>
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
  activeOpacity?: number;
  touchableProps?: TouchableOpacityProps;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  bottomSeparate?: boolean;
  theme?: "grayPlain" | "secondary";
  children?: JSX.Element | JSX.Element[] | undefined;
}

ButtonText.defaultProps = {
  isLoading: false,
  onPress: () => { },
  title: 'Crear o Consultar',
  widthSeparator: horizontalScale(METRICS.large15),
  activeOpacity: 0.2,
  children: undefined,
  bottomSeparate: true,
  theme: 'secondary'
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
    fontSize: FONTS.medium,
  },
  loading: {
    padding: METRICS.small5,
  },
});

export default React.memo(ButtonText)