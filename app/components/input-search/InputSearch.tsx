import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from "../../themes/Colors";
import METRICS from '../../themes/Metrics';
import { localToString } from '../../utils/StringUtil';
import Separator from '../separator/Separator';
import TrashIcon from '../icon/TrashIcon';
import CheckRender from '../security/CheckRender';

const SearchTextInput: FunctionComponent<propTypes> = props => {
  const [inputRef, setInputRef] = useState({ focus: () => { } });

  const leftIconPress = () => {
    inputRef?.focus()
  }

  const setRef = (ref: any) => {
    setInputRef(ref)
  }

  return (
    <>
      <View style={[Styles.container, props.containerStyle]}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.gray}
          style={Styles.iconLeft}
          onPress={leftIconPress}
        />
        <TextInput
          ref={setRef}
          style={Styles.input}
          placeholderTextColor={COLORS.grayPlaceholder}
          placeholder={props.placeholder}
          underlineColorAndroid="transparent"
          onChangeText={props.onValueChange}
          value={props.value}
          editable={!props.disabled}
          hitSlop={{ top: 15, right: 0, bottom: 15, left: 30 }}
        />
        <Separator width={10} />
        <CheckRender allowed={localToString(props.value).length > 0}>
          <TrashIcon
            onTouchablePress={() => props.onValueChange('')}
          />
        </CheckRender>
      </View>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </>
  )
};

interface propTypes {
  bottomSeparate?: boolean;
  placeholder?: string;
  value?: any;
  onValueChange: (val?: string) => void;
  filterText?: string;
  disabled?: any;
  showFilter?: any;
  containerStyle?: object;
  children?: JSX.Element | JSX.Element[] | undefined;
}

SearchTextInput.defaultProps = {
  bottomSeparate: true,
  placeholder: 'Buscar',
  filterText: 'Filtro',
  value: '',
  onValueChange: (val) => console.log(val),
  disabled: false,
  showFilter: true,
  containerStyle: {},
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: METRICS.medium10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.white,
    height: 60,
    justifyContent: 'center',
    alignContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: COLORS.gray,
    paddingLeft: 0,
  },
  filterText: {
    textAlign: 'center',
    paddingTop: 10
  },
  iconLeft: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingRight: 10,
  },
  trashCan: {
    marginRight: METRICS.medium10,
    backgroundColor: "transparent",
  },
  iconRight: {
    backgroundColor: "transparent",
  },
});

export default SearchTextInput;
