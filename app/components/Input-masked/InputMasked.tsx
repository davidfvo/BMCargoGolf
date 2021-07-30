import React, { FunctionComponent, useState } from 'react';
import { StyleProp, StyleSheet, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../themes';
import COLORS from '../../themes/Colors';
import METRICS from '../../themes/Metrics';
import { horizontalScale, verticalScale } from '../../utils/StyleHelpers';
import { isEmpty } from '../../utils/ValidationUtil';
import CustomLoading from '../loading/Loading';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';
import Text from '../text/Text';

const InputMasked: FunctionComponent<propTypes> = props => {
  const [localError, setLocalError] = useState<boolean>(false)

  interface maskTypesProps {
    [key: string]: string
  }

  const maskTypes: maskTypesProps = {
    phone: "([000]) [000] [0000]",
    identification: "[000]-[0000000]-[0]",
    passport: "[00000000000]",
    card: "[0000] [0000] [0000] [0000]",
    rnc: "[0]-[00]-[00000]-[0]",
    expiration: "[00]/[00]"
  }

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
    borderColor: (shouldShowError && COLORS.error) || COLORS.white,
    borderWidth: (shouldShowError && 1) || 0,
  }
  const textColorStyle: StyleProp<TextStyle> = {
    color: props.value ? COLORS.gray : COLORS.grayPlaceholder,
  }

  //Rendering
  return (
    <>
      <View style={[
        Styles.container,
        errorStyle,
        props.containerStyle,
        { marginHorizontal: props.widthSeparator },
      ]}>
        <CheckRender allowed={props.isLoading}>
          <CustomLoading size='small' />
        </CheckRender>
        <CheckRender allowed={!props.isLoading}>
          <CheckRender allowed={props.iconName}>
            <View style={Styles.secondaryView}>
              <Ionicons
                name={props.iconName || "add"}
                style={[Styles.icon, textColorStyle]}
              />
            </View>
            <Separator width={METRICS.medium10} />
          </CheckRender>
          <TextInputMask
            {...props}
            onChangeText={onValueChange}
            placeholderTextColor={COLORS.grayPlaceholder}
            ref={props.setRef}
            style={[Styles.input, props.inputStyle]}
            keyboardType='number-pad'
            onBlur={onBlur}
            mask={maskTypes[props.mask || 'phone']}
          />
          <CheckRender allowed={props.label}>
            <Text style={Styles.label}>{props.label}</Text>
          </CheckRender>
          <CheckRender allowed={props.rightSection}>
            {props.rightSection}
          </CheckRender>
        </CheckRender>
      </View>
      <CheckRender allowed={!props.isLoading && shouldShowError}>
        <Text style={[Styles.errorText, { marginHorizontal: props.widthSeparator }]}>
          {props.errorText}
        </Text>
      </CheckRender>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
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
  widthSeparator?: number;
  label?: string;
  errorText?: string;
  mask?: "phone" | "identification" | "passport" | "card" | "rnc" | "expiration",
  iconName?: string;
  rightSection?: JSX.Element | JSX.Element[] | undefined;
}

InputMasked.defaultProps = {
  maxLength: 27,
  bottomSeparate: true,
  isLoading: false,
  showError: false,
  simpleError: false,
  complexError: undefined,
  errorText: "Campo llenado de forma incorrecta",
  widthSeparator: horizontalScale(METRICS.large15),
}

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(METRICS.medium10),
    backgroundColor: COLORS.lightGray,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    borderRadius: 5,
  },

  input: {
    fontSize: 18,
    color: COLORS.gray,
    paddingLeft: 0,
    flex: 1,
  },

  label: {
    color: COLORS.secondary,
    fontSize: FONTS.word,
  },

  errorText: {
    color: COLORS.error,
    fontSize: FONTS.word,
    marginTop: verticalScale(METRICS.medium10),
  },
  secondaryView: {
    flex: 0,
  },
  icon: {
    fontSize: FONTS.mediumIcon,
    color: COLORS.gray,
  },
});

export default InputMasked;