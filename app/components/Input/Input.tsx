import React, { FunctionComponent, useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import Colors from '../../themes/Colors';
import METRICS from '../../themes/Metrics';
import { isEmpty } from '../../utils/ValidationUtil';
import CustomLoading from '../loading/Loading';
import CheckRender from '../security/CheckRender';
import CustomSeparator from '../separator/Separator';

const Input: FunctionComponent<propTypes> = props => {
  const [localError, setLocalError] = useState<boolean>(false)

  //Misc
  const onBlur = () => {
    if (props.simpleError) {
      setLocalError(isEmpty(props.value))
    } else if (typeof props.complexError == 'function') {
      setLocalError(!props.complexError(props.value))
    }
    if (typeof props.onInputBlur == 'function') {
      props.onInputBlur()
    }
  }

  const onValueChange = (value: string) => {
    if (typeof props.fieldIsValid == 'function') {
      if (props.simpleError) {
        props.fieldIsValid(!isEmpty(value))
      } else if (typeof props.complexError == 'function') {
        props.fieldIsValid(props.complexError(value))
      }
    }
    if (typeof props.onValueChange == 'function') {
      props.onValueChange(value)
    }
  }

  const shouldShowError = props.showError || localError
  const errorStyle: StyleProp<ViewStyle> = {
    borderColor: (shouldShowError && Colors.error) || Colors.white,
    borderWidth: (shouldShowError && 1) || 0,
  }

  //Rendering
  return (
    <>
      <View style={[
        Styles.container,
        errorStyle,
        props.containerStyle,
      ]}>
        <CheckRender allowed={props.isLoading}>
          <CustomLoading size='small' />
        </CheckRender>
        <CheckRender allowed={!props.isLoading}>
          <TextInput
            {...props}
            onChangeText={onValueChange}
            placeholderTextColor={Colors.grayPlaceholder}
            ref={props.setRef}
            style={[Styles.input, props.inputStyle]}
            onBlur={onBlur}
          />
        </CheckRender>
      </View>
      <CheckRender allowed={props.bottomSeparate}>
        <CustomSeparator />
      </CheckRender>
    </>
  );
}

interface propTypes extends Omit<TextInputProps, 'onChangeText'> {
  bottomSeparate?: boolean;
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  setRef?: any;
  onValueChange?: (text: string) => void;
  showError?: boolean;
  simpleError?: boolean;
  complexError?: (value?: string) => boolean;
  onInputBlur?: () => void;
  fieldIsValid?: (value?: boolean) => void;
}

Input.defaultProps = {
  maxLength: 27,
  bottomSeparate: true,
  isLoading: false,
  showError: false,
  simpleError: false,
  complexError: undefined,
}

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: METRICS.medium10,
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  input: {
    fontSize: 18,
    color: Colors.gray,
    paddingLeft: 0,
  },
});

export default Input;