import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, PermissionsAndroid, TouchableWithoutFeedback, View, ImageSourcePropType } from 'react-native';
import { CameraOptions, launchCamera } from 'react-native-image-picker';
import { connect, ConnectedProps } from "react-redux";
import Images from '../../../assets';
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import { RootState } from '../../../stores/AppReducers';
import { COLORS, FONTS } from '../../../themes';
import PermissionUtil from '../../../utils/PermissionUtil';
import { UserAccessNavigatorParamList } from '../../root/Navigators/UserAccessNavigator';
import { SignupState } from './SignupConstants';
import Styles from './SignupStyles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Text from '../../../components/text/Text';
import CheckRender from '../../../components/security/CheckRender';
import { safeValExtraction } from '../../../utils/ObjectUtil';
import Separator from '../../../components/separator/Separator';

const Signup = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<SignupState>({
    imagePicker: undefined,
  })

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      return () => { }
    }, [props.navigation])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current) {

    }
    return () => { }
  }, [])

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //MISC
  const takePicture = async () => {
    const ImagePickerOptions: CameraOptions = {
      mediaType: 'photo',
      cameraType: 'front',
    }

    launchCamera(ImagePickerOptions, onStateChange('imagePicker'))
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    if(safeValExtraction(value, 'didCancel') || safeValExtraction(value, 'errorCode')){
      return setState(prevState => update(prevState, { [key]: { $set: undefined } }));
    }
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container>
      <Header
        title="Crear cuenta"
        leftIcon
      />
      <Content
        contentContainerStyle={Styles.content}
        keyboardShouldPersistTaps='always'
      >
        <Separator />
        <View style={Styles.formSection}>

          {/* Photo Circle */}
          <TouchableWithoutFeedback onPress={takePicture}>
            <View style={state.imagePicker ? {} : Styles.photoContain}>
              <CheckRender allowed={state.imagePicker}>
                <Image
                  source={{ uri: state.imagePicker?.assets?.[0].uri }}
                  style={Styles.photo}
                  resizeMode='cover'
                />
              </CheckRender>
              <CheckRender allowed={!state.imagePicker}>
                <Ionicons
                  name="camera"
                  size={FONTS.mediumIcon}
                  color={COLORS.secondary}
                />
                <Text style={Styles.photoText}>Tirar foto</Text>
              </CheckRender>
            </View>
          </TouchableWithoutFeedback>


        </View>
        <Button
          onPress={() => props.navigation.navigate("Signin", {})}
          title="Ya tienes cuenta?"
          theme="grayPlain"
          containerStyle={Styles.signinButton}
        />
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<UserAccessNavigatorParamList, 'Signup'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
});

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Signup)