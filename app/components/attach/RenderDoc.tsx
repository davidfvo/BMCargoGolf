import React, { FunctionComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { METRICS } from '../../themes';
import Colors from '../../themes/Colors';
import TrashIcon from '../icon/TrashIcon';
import { ItemProps } from './AttachConstants';

const RenderDoc: FunctionComponent<propTypes> = props => {
  const item = props.item
  const index = props.index

  return (
    <View style={Styles.docContainer}>
      <Text style={Styles.docTitle}>
        {item.name}
      </Text>
      <View style={Styles.iconContainer}>
        <TrashIcon
          onTouchablePress={() => props.removeAttach(index)}
        />
      </View>
    </View>
  )
}

interface propTypes extends ItemProps {
  removeAttach: (index: number) => void;
  children?: JSX.Element | JSX.Element[] | undefined;
}

RenderDoc.defaultProps = {

}

const Styles = StyleSheet.create({
  docContainer: {
    width: 130,
    height: 70,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignContent: 'center',
  },
  doc: {
    flex: 1,
    borderRadius: 10,
  },
  emptyDoc: {
    width: 30,
    height: 30,
    tintColor: Colors.error,
  },
  trashCan: {
    marginRight: METRICS.small5,
    backgroundColor: "transparent",
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.error,
    padding: 2,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 5,
  },
  docTitle: {
    fontSize: 16,
    color: Colors.primary,
  },
});

export default RenderDoc