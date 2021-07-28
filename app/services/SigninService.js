import auth from "@react-native-firebase/auth";
import { BaseApi } from "./BaseApi";

const emailFirebaseLogin = async (username, password) => {
  console.log({ username, password })
  return auth().signInWithEmailAndPassword(username, password)
    .then(res => {
      const result = {
        code: '0',
        success: true,
        fail: false,
        data: res,
        error: null,
      }
      console.log(result)
      return result
    })
    .catch(err => {
      const error = {
        code: '500',
        success: false,
        fail: true,
        data: {},
        error: {
          code: err.code,
          message: err.nativeErrorMessage || err.message,
        },
      }
      console.log(error)
      return error
    })
}

const sendEmailVerification = async () => {
  return auth().currentUser.sendEmailVerification()
    .then(res => {
      const result = {
        code: '0',
        success: true,
        fail: false,
        data: res,
        error: null,
      }
      console.log(result)
      return result
    })
    .catch(err => {
      const error = {
        code: '500',
        success: false,
        fail: true,
        data: {},
        error: {
          code: err.code,
          message: err.nativeErrorMessage || err.message,
        },
      }
      console.log(error)
      return error
    })
}

const resetPassword = async (email) => {
  console.log({ email })
  return auth().sendPasswordResetEmail(email)
    .then(res => {
      const result = {
        code: '0',
        success: true,
        fail: false,
        data: res,
        error: null,
      }
      console.log(result)
      return result
    })
    .catch(err => {
      const error = {
        code: '500',
        success: false,
        fail: true,
        data: {},
        error: {
          code: err.code,
          message: err.nativeErrorMessage || err.message,
        },
      }
      console.log(error)
      return error
    })
}

const firebaseLogout = async () => {
  return auth().signOut()
    .then(res => {
      const result = {
        code: '0',
        success: true,
        fail: false,
        data: res,
        error: null,
      }
      console.log(result)
      return result
    })
    .catch(err => {
      const error = {
        code: '500',
        success: false,
        fail: true,
        data: {},
        error: {
          code: err.code,
          message: err.nativeErrorMessage || err.message,
        },
      }
      console.log(error)
      return error
    })
}

export default {
  emailFirebaseLogin,
  sendEmailVerification,
  resetPassword,
  firebaseLogout,
};
