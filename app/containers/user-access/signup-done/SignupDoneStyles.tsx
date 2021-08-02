import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../themes';
import { moderateScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {

  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    height: moderateScale(125),
    width: moderateScale(125),
    borderRadius: moderateScale(125),
    borderColor: COLORS.lightGray,
    borderWidth: 1,
  },
  welcomeTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
  },
  welcomeBody: {
    fontSize: FONTS.medium,
  },
});

export default Styles