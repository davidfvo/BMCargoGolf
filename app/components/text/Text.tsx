import React, { FunctionComponent } from 'react';
import { Text as RnText, TextProps, StyleProp, TextStyle } from 'react-native';
import { COLORS, FONTS } from '../../themes';

const Text: FunctionComponent<propTypes> = props => {
  return <RnText style={[props.textStyle, props.style]} {...props}>{props.children}</RnText>;
};

interface propTypes extends TextProps {
  children: any,
  textStyle?: StyleProp<TextStyle>,
}

Text.defaultProps = {
  textStyle: { 
    color: COLORS.black,
    fontSize: FONTS.regular,
  },
}


export default React.memo(Text);