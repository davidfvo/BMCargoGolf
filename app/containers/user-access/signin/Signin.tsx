import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import { RootState } from '../../../stores/AppReducers';
import { UserAccessNavigatorParamList } from '../../root/Navigators/UserAccessNavigator';
import { SigninState } from './SigninConstants';

const Signin = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<SigninState>({})

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
      <Header
        title=""
        leftIcon
      />
      <Content>

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