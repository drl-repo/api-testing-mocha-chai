import addContext  from 'mochawesome/src/addContext.js';

export default function captureResp(_this, response){
    addContext(_this, {
      title: 'Response',
      value: {
        status: response.statusCode,
        header: response.header,
        body: response.body,
      },
    });
}
