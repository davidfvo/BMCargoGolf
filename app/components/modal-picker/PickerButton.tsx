import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { IModalListInDto } from 'react-native-picker-modal-view/dist/Interfaces';
import Octicons from 'react-native-vector-icons/Octicons';
import COLORS from '../../themes/Colors';
import CustomLoading from '../loading/Loading';
import CheckRender from '../security/CheckRender';

export const PickerButton: FunctionComponent<propTypes> = props => {
  const textColorStyle: StyleProp<TextStyle> = {
    color: props.value ? COLORS.gray : COLORS.grayPlaceholder,
  }

  return (
    <TouchableOpacity
      {...props}
      style={Styles.container}
    >
      <CheckRender allowed={!props.isLoading}>
        <View style={Styles.primaryView}>
          <Text
            style={[Styles.title, textColorStyle]}
          >
            {props.value && props.value.Name || props.placeholder}
          </Text>
        </View>
        <View style={Styles.secondaryView}>
          <Octicons
            name="triangle-down"
            style={[Styles.icon, textColorStyle]}
          />
        </View>
      </CheckRender>
      <CheckRender allowed={props.isLoading}>
        <CustomLoading style={Styles.loading} color={props.color} />
      </CheckRender>
    </TouchableOpacity>
  );
}

interface propTypes extends TouchableOpacityProps {
  color?: string;
  placeholder?: string;
  value?: IModalListInDto;
  isLoading?: boolean;
}

PickerButton.defaultProps = {
  color: COLORS.primary
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    color: COLORS.gray,
    paddingLeft: 0,
  },
  primaryView: {
    flex: 1,
  },
  secondaryView: {
    flex: 0,
  },
  icon: {
    fontSize: 22,
    color: COLORS.gray,
  },
  loading: {
    padding: 0,
  }
});