import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../themes';
import { moderateScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {

  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: moderateScale(35),
    textAlign: 'center',
    color: COLORS.black,
  },
  forgottenButton: {
    justifyContent: "flex-end"
  },
  signupButton: {
    position: 'absolute',
    bottom: 20,
  },
});

export default Styles