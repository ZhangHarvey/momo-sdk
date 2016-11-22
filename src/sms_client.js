import request from 'http_client';
import uuid from 'node-uuid';

const VERSION = 'v1';
const APIS = {
  mqSend: '/sms/mq_send',
  batchSend: '/sms/batch_send',
  commonSend: '/sms/common_send',
  report: '/sms/report',
};

export default class SMSClient {
  /**
   * @constructor
   * @param {string} host - momodani服务的host
   */
  constructor(host, requestStub) {
    if (!host) {
      throw new Error('Invalid arguments: host is empty!');
    }
    this.host = host;
    this.request = requestStub || request;
  }

  mqSend(options = {}) {
    return this.httpRequest(options, 'mqSend');
  }

  batchSend(options = {}) {
    return this.httpRequest(options, 'batchSend');
  }

  commonSend(options = {}) {
    return this.httpRequest(options, 'commonSend');
  }

  report({
    mobile,
    ssid,
    status,
  }) {
    return this.httpRequest({
      mobile,
      ssid,
      status,
    }, 'report');
  }

  httpRequest(form, type) {
    return this.request({
      url: `${this.host}/${VERSION}/${APIS[type]}`,
      method: 'POST',
      headers: {
        'X-UUID': SMSClient.getUuid(), // 避免请求两次的token
      },
      form,
      timeout: 10000,
    });
  }

  static getUuid() {
    return uuid.v4();
  }
}
