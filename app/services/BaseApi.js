import { create } from 'apisauce';
import Config from 'react-native-config';
import ResponseCode from './ResponseCode';

const BaseApi = create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: Number(Config.TIMEOUT) || 60000,
});

function transformResponse(response) {
  console.log(response);
  if (response.ok || response.problem === "CLIENT_ERROR") {
    if (response.data && response.data?.code == '500' && response.data.message) {
      response.problem = response.data;
    } else if (response.data && response.data?.code == '404' && response.data.message) {
      response.problem = response.data;
    }
  } else if (ResponseCode[response.problem]) {
    response.problem = ResponseCode[response.problem]
  } else {
    response.problem = ResponseCode.CONNECTION_ERROR
  }
  return () => {}
}

// Para probar, impirmir todos los request y response que se llamen
BaseApi.addRequestTransform(console.log);

// Transformando el response para poner los errores generales
BaseApi.addResponseTransform(transformResponse);

const baseApiResponseReturn = (response) => {
  return response
}

export { 
  BaseApi,
  baseApiResponseReturn,
};
