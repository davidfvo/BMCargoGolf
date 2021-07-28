import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareFlatList, KeyboardAwareFlatListProps } from 'react-native-keyboard-aware-scroll-view';
import METRICS from '../../themes/Metrics';
import Separator from '../separator/Separator';

const ContentFlatList: FunctionComponent<propTypes> = props => {
  return (
    <KeyboardAwareFlatList
      {...props}
      showsVerticalScrollIndicator={false}
    />
  )
};

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
})

interface ItemT { }

interface propTypes extends KeyboardAwareFlatListProps<ItemT> {
  containerStyle?: object,
}

const defaultProps = {
  ListHeaderComponent: <Separator />,
  ListFooterComponent: <Separator />,
  ItemSeparatorComponent: Separator,
  containerStyle: { paddingHorizontal: METRICS.large15 },
}

ContentFlatList.defaultProps = defaultProps;

export default ContentFlatList