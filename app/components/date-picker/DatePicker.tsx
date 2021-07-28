import moment from 'moment';
import React, { FunctionComponent, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import DatePicker, { DateTimePickerProps } from "react-native-modal-datetime-picker";
import { COLORS, METRICS } from '../../themes';
import Loading from '../loading/Loading';
import Separator from '../separator/Separator';
import CheckRender from '../security/CheckRender';

const CustomDatePicker: FunctionComponent<propTypes> = props => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const changeVisible = () => {
    setIsVisible(!isVisible)
  }

  const onConfirm = (value?: Date) => {
    setIsVisible(false)
    props.onValueChange(value)
  }

  const onCancel = () => {
    setIsVisible(false)
    props.onValueChange(undefined)
  }

  const shouldShowError = props.showError
  const errorStyle: StyleProp<ViewStyle> = {
    borderColor: (shouldShowError && COLORS.error) || 'transparent',
    borderWidth: (shouldShowError && 1) || 0,
  }
  const textColorStyle: StyleProp<TextStyle> = {
    color: props.value ? COLORS.gray : COLORS.grayPlaceholder,
  }

  return (
    <TouchableOpacity
      style={Styles.container}
      onPress={changeVisible}
    >
      <View
        style={[
          Styles.content,
          errorStyle,
        ]}>
        <CheckRender allowed={props.isLoading}>
          <Loading size='small' />
        </CheckRender>
        <CheckRender allowed={!props.isLoading}>
          <Text style={[Styles.label, textColorStyle]}>
            {(props.value && moment(props.value).format(props.labelFormat)) || props.placeholder}
          </Text>
          <DatePicker
            {...props}
            minuteInterval={undefined}
            accessibilityLabel='CustomDatePicker'
            isVisible={isVisible}
            onConfirm={onConfirm}
            onCancel={onCancel}
            date={props.value || props.minimumDate || new Date()}
            cancelTextIOS="Cancelar"
            confirmTextIOS="Aceptar"
            headerTextIOS={props.placeholder}
          />
        </CheckRender>
      </View>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </TouchableOpacity>
  );
};

interface propTypes extends Omit<DateTimePickerProps, 'onConfirm' | 'onCancel'> {
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  value?: Date;
  onValueChange: (val?: Date) => void;
  labelFormat?: string;
  showError?: boolean;
  children?: JSX.Element | JSX.Element[] | undefined;
  bottomSeparate?: boolean;
}

CustomDatePicker.defaultProps = {
  is24Hour: false,
  isLoading: false,
  disabled: false,
  value: undefined,
  placeholder: '',
  labelFormat: 'DD/MM/YYYY',
  onValueChange: () => console.log('Changed'),
  showError: false,
  bottomSeparate: true,
}

const Styles = StyleSheet.create({
  container: {},
  content: {
    flex: 1,
    paddingHorizontal: METRICS.xLargeMedium25,
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },

  label: {
    fontSize: 18,
    color: COLORS.grayPlaceholder,
  },
});

export default CustomDatePicker;
