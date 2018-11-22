import $ from 'jquery';

export default class CmsService {
  _endPoint = {
    url: '',
    type: 'GET',
    dataType: 'json',
    async: true,
    data: null,
    timeout: '30000', //30s timeout
    success: () => {},
    error: () => {}
  }
  constructor(endpoint) {
    this._endPoint = Object.assign(this._endPoint, endpoint);
    this.fireRequest(this._endPoint);
  }
  fireRequest(obj) {
    return $.ajax(obj);
  }
}