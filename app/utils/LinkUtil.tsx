import { Linking } from 'react-native';
import { isValidEmail, isValidPhone, isValidUrl } from './ValidationUtil';

const call = (phone: any) => {
  if (isValidPhone(phone)) {
    Linking.openURL(`tel:${phone}`);
  } else {
    console.log('Phone not valid')
  }
};

const sendWAMessage = (phone: any) => {
  Linking.openURL(`whatsapp://send?text=""&phone=${phone}`);
}

const sendEmail = (email: any) => {
  if (isValidEmail(email)) {
    Linking.openURL(`mailto:${email}`);
  } else {
    console.log('Email not valid')
  }
};

const open = (url: any) => {
  if (isValidUrl(url)) {
    Linking.openURL(url);
  } else {
    console.log('url not valid')
  }
};

export default {
  call,
  sendWAMessage,
  sendEmail,
  open,
};