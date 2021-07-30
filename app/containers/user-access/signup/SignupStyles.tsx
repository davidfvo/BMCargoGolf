import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { horizontalScale, moderateScale } from '../../../utils/StyleHelpers';

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
  photoIcon: {
    position: 'absolute',
    bottom: moderateScale(5),
    right: moderateScale(5),
  },
  photoText: {
    color: COLORS.secondary,
    fontSize: FONTS.small,
  },
  firstTermsSentence: {
    marginHorizontal: horizontalScale(METRICS.large15),
    fontSize: FONTS.medium,
    textAlign: "center",
    color: COLORS.gray,
  },

  secondTermsSentence: {
    marginHorizontal: horizontalScale(METRICS.large15),
    fontSize: FONTS.medium,
    textAlign: "center",
    fontWeight: 'bold',
    color: COLORS.secondary,
  },

  signinButton: {

  },
});

export default Styles