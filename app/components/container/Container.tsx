import React, { FunctionComponent } from 'react';
import { SafeAreaView, StatusBar, StatusBarStyle, StyleSheet, ViewProps } from 'react-native';
import { COLORS } from '../../themes';

const Container: FunctionComponent<propTypes> = props => {
  return (
    <SafeAreaView {...props} style={[Styles.container, { backgroundColor: props.color }]}>
      <StatusBar backgroundColor={props.barColor || COLORS.primary} barStyle={props.barStyle} />
      {props.children}
    </SafeAreaView>
  );
}

interface propTypes extends ViewProps {
  color?: string;
  barColor?: string;
  children?: JSX.Element | JSX.Element[] | undefined;
  barStyle?: null | StatusBarStyle;
}

Container.defaultProps = {
  color: COLORS.white,
  barStyle: 'light-content',
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default React.memo(Container);