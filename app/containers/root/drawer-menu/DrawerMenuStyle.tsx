import { Platform, StyleSheet } from "react-native";
import { COLORS, FONTS, METRICS } from "../../../themes";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  textStyle: {
    color: COLORS.primary
  },
  logoutView: {
    flex: 0,
    justifyContent: 'flex-end',
  },
  logoutOption: {
    paddingTop: METRICS.medium10,
    paddingBottom: METRICS.medium10,
  },
});
