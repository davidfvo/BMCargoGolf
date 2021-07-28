import React, { FunctionComponent } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';

const Loading: FunctionComponent<propTypes> = props => {
  return (
    <ActivityIndicator
      {...props}
    />
  )
};

interface propTypes extends ActivityIndicatorProps { }

const defaultProps = {
  size: 36,
  color: Colors.white,
  style: {
    padding: Metrics.medium10,
  },
}

Loading.defaultProps = defaultProps;

export default React.memo(Loading);