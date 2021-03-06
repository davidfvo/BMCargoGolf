import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from "react-redux";
import ButtonText from '../../../components/button-text/ButtonText';
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import InputMasked from '../../../components/Input-masked/InputMasked';
import Input from '../../../components/Input/Input';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { RootState } from '../../../stores/AppReducers';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { safeValExtraction } from '../../../utils/ObjectUtil';
import { UserAccessNavigatorParamList } from '../../root/Navigators/UserAccessNavigator';
import { SigninState } from './SigninConstants';
import Styles from './SigninStyles';

const Signin = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<SigninState>({
    hidePassword: true,
    docNumber: undefined,
    password: undefined,
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

  //Value change handlers
  const _onStateChange = (key: string, value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: value } }));
  };

  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container>
      <Header
        title="Inicio de sesi??n"
        leftIcon
      />
      <Content
        contentContainerStyle={Styles.content}
        keyboardShouldPersistTaps='always'
      >
        <View style={Styles.formSection}>
          <Text style={Styles.welcomeText}>Bienvenido!</Text>
          <Separator height={METRICS.xxLarge30} />
          <InputMasked
            label="N??mero Documento"
            mask='identification'
            value={state.docNumber}
            onValueChange={onStateChange("docNumber")}
          />
          <Input
            secureTextEntry={state.hidePassword}
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
          <ButtonText
            onPress={() => { }}
            title="Olvid?? mi contrase??a?"
            theme="secondary"
            containerStyle={Styles.forgottenButton}
          />
          <Button
            onPress={() => { }}
            title="Iniciar"
            theme="secondary"
          />
        </View>
        <Button
          onPress={() => props.navigation.navigate("Signup", {})}
          title="No tienes cuenta?"
          theme="grayPlain"
          containerStyle={Styles.signupButton}
        />
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<UserAccessNavigatorParamList, 'Signin'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
});

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Signin)