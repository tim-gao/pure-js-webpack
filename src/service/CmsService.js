export default class CmsService {
  _endPoint = {
    url: '',
    type: 'GET',
    dataType: 'json',
    async: true,
    data: null,
    timeout: '30000'
  }
  constructor(endpoint) {
    this._endPoint = Object.assign(this._endPoint, endpoint);
    return this.fireRequest(this._endPoint);
  }
  fireRequest(obj) {
    return new Promise(function (resolve, reject) {
      const client = new XMLHttpRequest();
      client.open(obj.type || 'GET', obj.url, obj.async);
      client.onreadystatechange = () => {
        if (client.readyState !== 4) {
          return;
        }
        if (client.status === 200) {
          resolve(client.response);
        } else {
          reject(new Error(client.statusText));
        }
      };
      client.ontimeout = () => {
        reject(new Error(client.statusText));
      };
      client.responseType = obj.responseType || 'json';
      client.setRequestHeader('ACCEPT', 'application/json');
      client.timeout = obj.timeout || 0;
      client.send(JSON.stringify(obj.data));
    });
  }
}