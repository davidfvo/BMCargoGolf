const ResponseCode = {
  BAD_REQUEST: {
    code: 400,
    message: 'Parametros enviados incorrectos',
  },
  NOT_FOUND: {
    code: 404,
    message: 'Registro no encontrado',
  },
  CONNECTION_ERROR: {
    code: 600,
    message: 'Error en la conexión',
  },
  NETWORK_ERROR: {
    code: 503,
    message: 'No se pudo comunicar con el servicio',
  },
  TIMEOUT_ERROR: {
    code: 504,
    message: 'Tiempo de respuesta excedido',
  },
  SERVER_ERROR: {
    code: 500,
    message: 'Problemas en el servidor procesando los datos Intentar más tarde',
  },
};
export default ResponseCode;
