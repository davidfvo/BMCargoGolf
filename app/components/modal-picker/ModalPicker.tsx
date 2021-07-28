import React, { FunctionComponent, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import PickerModal from 'react-native-picker-modal-view';
import { IModalListInDto } from 'react-native-picker-modal-view/dist/Interfaces';
import METRICS  from '../../themes/Metrics';
import Colors from '../../themes/Colors';
import { isEmpty } from '../../utils/ValidationUtil';
import CustomSeparator from "../separator/Separator";
import CheckRender from "../security/CheckRender";
import { PickerButton } from "./PickerButton";

const ModalPicker: FunctionComponent<propTypes> = props => {
  const [localError, setLocalError] = useState<boolean>(false)

  //Misc
  const onValueChange = (selected: IModalListInDto) => {
    if (props.simpleError) {
      setLocalError(isEmpty(selected))
    } else if (typeof props.complexError == 'function') {
      setLocalError(!props.complexError(selected))
    }
    if (typeof props.onValueChange == 'function') {
      props.onValueChange(selected)
    }
    return selected
  }

  const onEndReached = () => {

  }

  const onClosed = () => {

  }

  const onBackButtonPressed = () => {
    if (props.simpleError) {
      setLocalError(isEmpty(props.value))
    } else if (typeof props.complexError == 'function') {
      setLocalError(!props.complexError(props.value))
    }
  }

  const shouldShowError = props.showError || localError
  const errorStyle: StyleProp<ViewStyle> = {
    borderColor: (shouldShowError && Colors.error) || Colors.white,
    borderWidth: (shouldShowError && 1) || 0,
  }

  //Rendering
  const LocalPickerButton = (disabled: boolean, selected: IModalListInDto, showModal: () => void) => {
    return (
      <PickerButton
        onPress={showModal}
        disabled={disabled}
        value={props.value}
        placeholder={props.placeholder}
        isLoading={props.isLoading}
      />
    )
  }

  return (
    <>
      <View
        style={[
          Styles.container,
          errorStyle,
        ]}
      >
        <PickerModal
          {...props}
          onEndReached={onEndReached}
          onClosed={onClosed}
          onBackButtonPressed={onBackButtonPressed}
          renderSelectView={LocalPickerButton}
          onSelected={onValueChange}
          items={props.data}
          selected={props.value}
        />
      </View>
      <CheckRender allowed={props.bottomSeparate}>
        <CustomSeparator />
      </CheckRender>
    </>
  )
}

interface propTypes {
  value?: IModalListInDto;
  onValueChange: (value?: IModalListInDto) => void;
  data?: IModalListInDto[];
  showError?: boolean;
  placeholder?: string;
  disabled?: boolean;
  searchPlaceholderText?: string;
  bottomSeparate?: boolean;
  simpleError?: boolean;
  complexError?: (value?: IModalListInDto) => boolean;
  isLoading?: boolean;
}

ModalPicker.defaultProps = {
  value: undefined,
  onValueChange: undefined,
  disabled: false,
  data: [],
  showError: false,
  placeholder: 'Seleccione una opción',
  searchPlaceholderText: 'Buscar',
  bottomSeparate: true,
  simpleError: false,
  complexError: undefined,
  isLoading: false,
};

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: METRICS.medium10,
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
});

export default ModalPicker;