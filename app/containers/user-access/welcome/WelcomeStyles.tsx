import { StyleSheet } from 'react-native';
import { COLORS } from '../../../themes';
import { moderateScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  imageIcon: {
    width: moderateScale(150),
    height: moderateScale(150),
  },
  welcomeText: {
    fontSize: moderateScale(40),
    textAlign: 'center',
    color: COLORS.white,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default Styles