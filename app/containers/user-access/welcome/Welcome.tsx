import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import Images from '../../../assets';
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import Separator from '../../../components/separator/Separator';
import { RootState } from '../../../stores/AppReducers';
import { UserAccessNavigatorParamList } from '../../root/Navigators/UserAccessNavigator';
import { WelcomeState } from './WelcomeConstants';
import Styles from './WelcomeStyles';

const Welcome = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<WelcomeState>({})

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
      <ImageBackground
        style={Styles.container}
        resizeMode='cover'
        source={Images.golf_course1}
      >
        <View style={Styles.section}>
          <Image
            style={Styles.imageIcon}
            resizeMode='cover'
            source={Images.ic_launcher}
          />
          <Separator />
          <Text style={Styles.welcomeText}>Bienvenido a Golfertek</Text>
        </View>
        <View style={Styles.section}>
          <Button
            onPress={() => { }}
            title="Registrarme"
            theme="secondary"
          />
          <Button
            onPress={() => props.navigation.navigate("Signin", {})}
            title="Iniciar sesión"
            theme="plain"
          />
          <Separator height={40} />
        </View>
      </ImageBackground>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<UserAccessNavigatorParamList, 'Welcome'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
});

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Welcome)