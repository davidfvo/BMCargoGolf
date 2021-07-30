import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { IModalListInDto } from 'react-native-picker-modal-view/dist/Interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS, METRICS } from '../../themes';
import COLORS from '../../themes/Colors';
import Loading from '../loading/Loading';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';

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
        <CheckRender allowed={props.iconName}>
          <View style={Styles.secondaryView}>
            <Ionicons
              name={props.iconName || "add"}
              style={[Styles.icon, textColorStyle]}
            />
          </View>
          <Separator width={METRICS.medium10} />
        </CheckRender>
        <View style={Styles.primaryView}>
          <Text
            style={[Styles.title, textColorStyle]}
          >
            {props.value && props.value.Name || props.placeholder}
          </Text>
        </View>
        <View style={Styles.secondaryView}>
          <Ionicons
            name="caret-down"
            style={[Styles.icon, textColorStyle]}
          />
        </View>
      </CheckRender>
      <CheckRender allowed={props.isLoading}>
        <Loading style={Styles.loading} color={props.color} />
      </CheckRender>
    </TouchableOpacity>
  );
}

interface propTypes extends TouchableOpacityProps {
  color?: string;
  placeholder?: string;
  value?: IModalListInDto;
  isLoading?: boolean;
  iconName?: string;
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
  },
  primaryView: {
    flex: 1,
  },
  secondaryView: {
    flex: 0,
  },
  icon: {
    fontSize: FONTS.mediumIcon,
    color: COLORS.gray,
  },
  loading: {
    padding: 0,
  }
});