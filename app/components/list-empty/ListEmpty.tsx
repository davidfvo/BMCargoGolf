import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../themes';

const ListEmpty: FunctionComponent<propTypes> = props => {
  return (
    <View style={Styles.flex1}>
      <Text style={Styles.errorText}>{props.errorText}</Text>
    </View>
  )
}

interface propTypes {
  errorText?: string;
}

ListEmpty.defaultProps = {
  errorText: 'No se encontraron datos',
}

const Styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  errorText: {
    color: COLORS.white,
    fontSize: FONTS.regular,
    alignSelf: 'center',
  },
})

export default React.memo(ListEmpty)