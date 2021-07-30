import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { CameraOptions, launchCamera } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from "react-redux";
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import InputMasked from '../../../components/Input-masked/InputMasked';
import Input from '../../../components/Input/Input';
import ModalPicker from '../../../components/modal-picker/ModalPicker';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { documentTypeData } from '../../../services/LocalService';
import { RootState } from '../../../stores/AppReducers';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { safeValExtraction } from '../../../utils/ObjectUtil';
import { UserAccessNavigatorParamList } from '../../root/Navigators/UserAccessNavigator';
import { SignupState } from './SignupConstants';
import Styles from './SignupStyles';

const Signup = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<SignupState>({
    imagePicker: undefined,
    docType: undefined,
    hidePassword: true,
    password: undefined,
    hidePasswordRetry: true,
    passwordRetry: undefined,
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
  const _onStateChange = (key: string, value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: value } }));
  };

  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    if (safeValExtraction(value, 'didCancel') || safeValExtraction(value, 'errorCode')) {
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
        <Separator height={METRICS.xxLarge30} />
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
                <Ionicons
                  name="camera"
                  size={FONTS.largeIcon}
                  color={COLORS.secondary}
                  style={Styles.photoIcon}
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

          <Separator height={METRICS.xxLarge30} />

          <ModalPicker
            data={documentTypeData}
            placeholder="Tipo de documento"
            iconName="document-text"
            value={state.docType}
            onValueChange={onStateChange('docType')}
          />
          <InputMasked
            iconName="person"
            placeholder="Número de documento"
            mask='identification'
            value={state.docNumber}
            onValueChange={onStateChange('docNumber')}
          />
          <Input
            secureTextEntry={state.hidePassword}
            placeholder="Contraseña"
            iconName="lock-closed"
            value={state.password}
            onValueChange={onStateChange("password")}
            rightSection={
              <Ionicons
                onPress={() => _onStateChange("hidePassword", !state.hidePassword)}
                name={state.hidePassword ? "eye" : "eye-off"}
                size={FONTS.mediumIcon}
                color={COLORS.secondary}
              />
            }
          />
          <Input
            secureTextEntry={state.hidePasswordRetry}
            placeholder="Repetir contraseña"
            iconName="lock-closed"
            value={state.passwordRetry}
            onValueChange={onStateChange("passwordRetry")}
            rightSection={
              <Ionicons
                onPress={() => _onStateChange("hidePasswordRetry", !state.hidePasswordRetry)}
                name={state.hidePasswordRetry ? "eye" : "eye-off"}
                size={FONTS.mediumIcon}
                color={COLORS.secondary}
              />
            }
          />

          <Text style={Styles.firstTermsSentence}>Al registrate con Golfertek estas aceptando los</Text>
          <Separator height={METRICS.small5} />
          <Text style={Styles.secondTermsSentence}>Términos y condiciones</Text>
          <Separator />

          <Button
            onPress={() => { }}
            title="Registrarme"
            theme="secondary"
          />
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