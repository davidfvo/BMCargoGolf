import React, { FunctionComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ErrorObject } from '../../stores/StoreConstants';
import { METRICS } from '../../themes';
import Colors from '../../themes/Colors';
import Fonts from '../../themes/Fonts';
import Button from '../button/Button';
import Loading from '../loading/Loading';
import Separator from '../separator/Separator';
import CheckRender from '../security/CheckRender';

const ErrorContainer: FunctionComponent<propTypes> = props => {
  return (
    <View style={[Styles.flex1, { backgroundColor: props.color }]}>
      <CheckRender allowed={props.isLoading}>
        <Loading
          color={Colors.white}
        />
      </CheckRender>
      <CheckRender allowed={props.showDE && !props.isLoading && !props.error}>
        {props.children}
      </CheckRender>
      <CheckRender allowed={props.showDE && !props.isLoading && props.error}>
        <View style={Styles.errorSection}>
          <CheckRender allowed={props.errorText}>
            <Text style={Styles.errorText}>
              {props.error?.message}
            </Text>
          </CheckRender>
          <CheckRender allowed={props.errorComponent}>
            <Separator />
            <Text style={Styles.errorText}>
              {props.error?.message} 
            </Text>
            <Separator />
            <Button
              title='Intentar de nuevo'
              onPress={props.tryAgain}
              bottomSeparate={false}
            />
          </CheckRender>
        </View>
        <CheckRender allowed={props.customError}>
          {props.customError}
        </CheckRender>
      </CheckRender>
    </View>
  );
}

interface propTypes {
  error?: ErrorObject;
  isLoading?: boolean | undefined;
  showDE?: boolean | undefined;
  tryAgain?: () => void;
  errorText?: string | undefined;
  errorComponent?: boolean | undefined;
  customError?: JSX.Element | JSX.Element[] | undefined;
  children?: JSX.Element | JSX.Element[] | undefined;
  color?: string;
}

ErrorContainer.defaultProps = {
  error: undefined,
  isLoading: false,
  showDE: true,
  tryAgain: () => console.log('tryAgain Pressed'),
  errorText: undefined,
  errorComponent: undefined,
  customError: undefined,
  color: Colors.secondary,
};

const Styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  errorText: {
    color: Colors.white,
    fontSize: Fonts.regular,
    alignSelf: 'center',
  },
  errorSection: {
    paddingHorizontal: METRICS.large15,
  },
})

export default ErrorContainer
