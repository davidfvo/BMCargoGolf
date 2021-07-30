import { ImagePickerResponse } from 'react-native-image-picker';
import { IModalListInDto } from 'react-native-picker-modal-view/dist/Interfaces';

export interface SignupState {
  imagePicker?: ImagePickerResponse,
  docType?: IModalListInDto,
  docNumber?: string;
  hidePassword: boolean;
  password?: string;
  hidePasswordRetry: boolean;
  passwordRetry?: string;
}