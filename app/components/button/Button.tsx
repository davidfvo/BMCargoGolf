import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewStyle, Text } from 'react-native';
import { METRICS } from '../../themes';
import Colors from '../../themes/Colors';
import Loading from '../loading/Loading';
import Separator from '../separator/Separator';
import CheckRender from '../security/CheckRender';

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

  const variableContentStyle = () => {
    return {
      marginHorizontal: props.widthSeparator,
      height: props.buttonHeight,
      borderRadius: props.buttonHeight && (props.buttonHeight / 2),
    }
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
            { backgroundColor: props.color },
            variableContentStyle(),
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
  color?: string;
  contentStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  bottomSeparate?: boolean;
  children?: JSX.Element | JSX.Element[] | undefined;
}

Button.defaultProps = {
  isLoading: false,
  onPress: () => { },
  title: 'Crear o Consultar',
  widthSeparator: 0,
  buttonHeight: 64,
  activeOpacity: 0.2,
  color: Colors.primary,
  children: undefined,
  bottomSeparate: true,
}

const Styles = StyleSheet.create({
  buttonContainer: {
    minHeight: 60,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: METRICS.medium10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
  },
  loading: {
    padding: METRICS.small5,
  },
});

export default React.memo(Button)