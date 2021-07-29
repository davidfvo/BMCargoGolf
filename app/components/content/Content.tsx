import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';
import METRICS from '../../themes/Metrics';
import Separator from '../separator/Separator';

const Content: FunctionComponent<propTypes> = props => {
  return (
    <KeyboardAwareScrollView
      style={[Styles.container, { backgroundColor: props.color }]}
      endFillColor={props.color}
      showsVerticalScrollIndicator={false}
      enableAutomaticScroll
      enableOnAndroid
      {...props}
      contentContainerStyle={[Styles.content, props.contentContainerStyle]}
    >
      {props.children}
    </KeyboardAwareScrollView>
  );
}

interface propTypes extends KeyboardAwareScrollViewProps {
  color?: string;
  scrollEnabled?: boolean;
  scrollViewStyle?: object;
  children?: JSX.Element | JSX.Element[] | undefined;
}

Content.defaultProps = {
  color: 'transparent',
  contentContainerStyle: {},
  scrollEnabled: true,
}

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
  },
})

export default React.memo(Content);