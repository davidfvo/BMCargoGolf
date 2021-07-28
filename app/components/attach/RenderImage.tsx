import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Colors from '../../themes/Colors';
import TrashIcon from '../icon/TrashIcon';
import { ItemProps } from './AttachConstants';

const RenderImage: FunctionComponent<propTypes> = props => {
  const item = props.item
  const index = props.index

  return (
    <View style={Styles.imageContainer}>
      <Image
        resizeMode='cover'
        style={Styles.image}
        source={{
          uri: item?.uri,
        }}
      />
      <View style={Styles.iconContainer}>
        <TrashIcon
          onTouchablePress={() => props.removeAttach(index)}
        />
      </View>
    </View >
  )
}

interface propTypes extends ItemProps {
  removeAttach: (index: number) => void;
  children?: JSX.Element | JSX.Element[] | undefined;
}

RenderImage.defaultProps = {

}

const Styles = StyleSheet.create({
  imageContainer: {
    width: 90,
    height: 70,
    marginRight: 20,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    backgroundColor: Colors.red,
    padding: 2,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 5,
  },
});

export default RenderImage