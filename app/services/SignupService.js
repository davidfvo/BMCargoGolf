
import auth from "@react-native-firebase/auth";
import { BaseApi } from "./BaseApi";

const firebaseCreateUser = async ({ email, password }) => {
  return auth().createUserWithEmailAndPassword(email, password)
    .then(async (res) => {
      await res.user.sendEmailVerification()
      const result = {
        code: '0',
        success: true,
        fail: false,
        data: {
          user: res.user,
          additionalUserInfo: res.additionalUserInfo,
        },
        error: null,
      }
      console.log(result)
      return result
    })
    .catch(err => {
      const result = {
        code: '500',
        success: false,
        fail: true,
        data: {},
        error: {
          code: err.code,
          message: err.nativeErrorMessage || err.message,
        },
      }
      console.log(result)
      return result
    })
}

export default {
  firebaseCreateUser,
};
