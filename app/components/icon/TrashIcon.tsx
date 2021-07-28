import React, { FunctionComponent } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconProps } from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS, METRICS, COLORS } from '../../themes';

const TrashIcon: FunctionComponent<propTypes> = props => {
  const localPress = () => {
    if (typeof props.onTouchablePress === 'function') {
      return props.onTouchablePress()
    } else {
      return () => { }
    }
  }

  const hitSlop = { top: 0, right: 0, left: 20, bottom: 20 }

  return (
    <TouchableOpacity hitSlop={hitSlop} onPress={localPress}>
      <Ionicons
        {...props}
        name='trash'
        size={FONTS.smallIcon}
        color={COLORS.red}
        style={[Styles.deleteIcon]}
      />
    </TouchableOpacity>
  );
}

interface propTypes extends Omit<IconProps, 'name'> {
  onTouchablePress?: () => void; 
  children?: JSX.Element | JSX.Element[] | undefined;
}

TrashIcon.defaultProps = {}

const Styles = StyleSheet.create({
  deleteIcon: {
    fontSize: 20,
    color: COLORS.white,
    marginHorizontal: METRICS.small5/2,
  },
})

export default React.memo(TrashIcon);