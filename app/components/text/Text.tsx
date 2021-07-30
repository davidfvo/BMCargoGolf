import React, { FunctionComponent } from 'react';
import { Text as RnText, TextProps, StyleProp, TextStyle } from 'react-native';
import { COLORS, FONTS } from '../../themes';

const Text: FunctionComponent<propTypes> = props => {
  return <RnText {...props} style={[props.textStyle, props.style]}>{props.children}</RnText>;
};

interface propTypes extends TextProps {
  children?: string,
  textStyle?: StyleProp<TextStyle>,
}

Text.defaultProps = {
  style: { 
    color: COLORS.black,
    fontSize: FONTS.regular,
  },
}


export default React.memo(Text);