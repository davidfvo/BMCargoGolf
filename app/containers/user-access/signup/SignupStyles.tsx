import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../themes';
import { moderateScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {

  },
  content: {
    alignItems: 'center',
  },
  formSection: {
    flex: 1,
    alignItems: 'center',
  },
  photoContain: {
    height: moderateScale(125),
    width: moderateScale(125),
    borderRadius: moderateScale(125),
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    height: moderateScale(125),
    width: moderateScale(125),
    borderRadius: moderateScale(125),
    borderColor: COLORS.lightGray,
    borderWidth: 1,
  },
  photoText: {
    color: COLORS.secondary,
    fontSize: FONTS.small,
  },
  signinButton: {
    position: 'absolute',
    bottom: 20,
  },
});

export default Styles