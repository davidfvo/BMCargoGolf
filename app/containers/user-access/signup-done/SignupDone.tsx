import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import Images from '../../../assets';
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { RootState } from '../../../stores/AppReducers';
import { UserAccessNavigatorParamList } from '../../root/Navigators/UserAccessNavigator';
import { SignupDoneState } from './SignupDoneConstants';
import Styles from './SignupDoneStyles';

const SignupDone = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<SignupDoneState>({})

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
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container>
      <Content
        contentContainerStyle={Styles.content}
      >
        <Image
          source={Images.user_photo}
          style={Styles.photo}
          resizeMode='cover'
        />
        <Separator />
        <Text style={Styles.welcomeTitle}>Bienvenido {'Nombre'}</Text>
        <Text style={Styles.welcomeBody}>Ya puedes Iniciar session en Golfertek con tus credenciales</Text>
        <Separator />
        <Button
          title="Iniciar"
          onPress={() => { }}
          theme='secondary'
        />
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<UserAccessNavigatorParamList, 'SignupDone'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
});

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(SignupDone)