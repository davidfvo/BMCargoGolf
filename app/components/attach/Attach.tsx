import React, { FunctionComponent, useState } from 'react';
import { FlatList, PermissionsAndroid, StyleSheet, View } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { CameraOptions, ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { METRICS } from '../../themes';
import { localToArray } from '../../utils/ArrayUtil';
import { localToNumber } from '../../utils/NumberUtil';
import PermissionUtil from '../../utils/PermissionUtil';
import CustomButton from '../button/Button';
import Separator from '../separator/Separator';
import CheckRender from '../security/CheckRender';
import { AttachItem, ItemProps, OptionTitle } from './AttachConstants';
import RenderDoc from './RenderDoc';
import RenderImage from './RenderImage';
import { localToObject } from '../../utils/ObjectUtil';

const Attach: FunctionComponent<propTypes> = props => {
  const [actionSheetRef, setActionSheetRef] = useState<ActionSheet | null>(null);

  const getDocumentPicker = async () => {
    try {
      const res: any = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.doc,
          DocumentPicker.types.pdf,
          DocumentPicker.types.xls,
          DocumentPicker.types.ppt,
          DocumentPicker.types.docx,
          DocumentPicker.types.xlsx,
          DocumentPicker.types.pptx,
        ],
      });
      handleAttach(res, 'DocumentPicker')
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  const getImagePicker = async (option: string) => {
    try {
      const ImagePickerOptions: ImageLibraryOptions & CameraOptions = {
        mediaType: 'photo',
        cameraType: 'back',
      }

      if (option == 'camera') {
        const permission = await PermissionUtil.requestAndroidPermission(PermissionsAndroid.PERMISSIONS.CAMERA, undefined, 'BMCargo necesita permisos para acceder a la camara', '');
        if (!permission) {
          return;
        }
        launchCamera(ImagePickerOptions, (res: any) => handleAttach(res, 'ImagePicker'))
      } else if (option == 'library') {
        launchImageLibrary(ImagePickerOptions, (res: any) => handleAttach(res, 'ImagePicker'))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleAttach = (response: ImagePickerResponse & DocumentPickerResponse, library = 'ImagePicker') => {
    if (response.didCancel || response.errorCode || response.copyError) {
      console.log(response)
      return () => { }
    }
    if (library == 'ImagePicker') {
      addAttach({ ...localToObject(response?.assets?.[0]), library })
    } else {
      addAttach({ ...response, library })
    }
  }

  const addAttach = (request: any) => {
    const result: object[] = [...(props.value || []), request]
    props.onValueChange(result)
  }

  const removeAttach = (position: number) => {
    const result: object[] = [...(props.value || [])].filter((doc, index) => index !== position)
    props.onValueChange(result)
  }

  const sheetPress = (sheetProps: number) => {
    const optionList = optionObject().options
    switch (optionList[sheetProps]) {
      case OptionTitle.camera:
        getImagePicker('camera')
        return
      case OptionTitle.library:
        getImagePicker('library')
        return
      case OptionTitle.document:
        getDocumentPicker()
        return
      default:
        return () => { }
    }
  }

  const optionObject = (): { cancelIndex: number, options: string[] } => {
    const options: string[] = [OptionTitle.cancel]

    const _options = [
      ...localToArray(props?.options)
    ].reverse().map((s: string): number => options.unshift(OptionTitle[s]))

    return {
      cancelIndex: localToNumber(options?.length) - 1,
      options: options || [],
    }
  }

  //Rendering
  const renderAttach = (item: ItemProps) => {
    const _item = item.item
    switch (_item.library) {
      case 'DocumentPicker':
        return (
          <RenderDoc
            index={item.index}
            item={_item}
            removeAttach={() => removeAttach(item.index)}
          />
        )
      case 'ImagePicker':
        return (
          <RenderImage
            index={item.index}
            item={_item}
            removeAttach={() => removeAttach(item.index)}
          />
        )
      default:
        return (<View />)
    }
  }

  return (
    <View style={Styles.container}>
      <CheckRender allowed={props.value && props.value?.length > 0}>
        <FlatList
          data={props.value}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderAttach}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
        <Separator height={METRICS.large15} />
      </CheckRender>
      <CheckRender allowed={props.showButton}>
        <CustomButton
          title={props.title || ''}
          onPress={() => actionSheetRef?.show()}
          children={props.buttonIcon}
        />
      </CheckRender>
      <ActionSheet
        ref={(ref: ActionSheet | null) => setActionSheetRef(ref)}
        title={props.actionTitle}
        options={optionObject().options}
        cancelButtonIndex={optionObject().cancelIndex}
        onPress={sheetPress}
      />
    </View>
  )
}

interface propTypes {
  value?: AttachItem[];
  title?: string;
  showButton?: boolean;
  onValueChange: (response: any | object) => void;
  actionTitle?: string;
  buttonIcon?: JSX.Element | JSX.Element[] | undefined;
  children?: JSX.Element | JSX.Element[] | undefined;
  options?: ('camera' | 'library' | 'document')[]
}

Attach.defaultProps = {
  value: [],
  onValueChange: (response) => console.log(response),
  title: 'Adjuntar',
  actionTitle: 'Opciones para adjuntar documento',
  showButton: true,
  buttonIcon: undefined,
  options: ['camera', 'library'],
}

const Styles = StyleSheet.create({
  container: {

  },
});

export default Attach;