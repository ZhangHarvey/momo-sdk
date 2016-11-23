import uuid from 'node-uuid';
import request from './http_client';

const VERSION = 'v1';
const APIS = {
  mqSend: '/sms/mq_send',
  batchSend: '/sms/batch_send',
  commonSend: '/sms/common_send',
  report: '/sms/report',
};
/** Class momodani SMS client */
export default class SMSClient {
  /**
   * 创建一个momodani sms客户端.
   * @constructor
   * @param {string} host - momodani服务的host.
   * @param {boolean} [debug] - 是否开启调试.
   * @param {Object} [requestStub] - request对象，用于替换http客户端.
   */
  constructor(host, debug = true, requestStub) {
    if (!host) {
      throw new Error('Invalid arguments: host is empty!');
    }
    this.host = host;
    this.request = requestStub || request(debug);
  }

  /**
   * 使用队列发送.
   * @param {Object} args - 请求参数.
   * @param {string} args.smser - 发送渠道.
   * @param {string} args.type - 短信类型.
   * @param {number} args.delay - 延迟时间(秒).
   * @param {Object} args.messages - 短信内容.
   * @param {string} args.admin_id - 管理员id.
   * @param {string} args.batch - 请求批次.
   * @return {Object} A promise object.
   */
  mqSend(args = {}) {
    return this.httpRequest(args, 'mqSend');
  }

  /**
   * 批量发送（最好最多不超过1万条）.
   * @param {Object} args - 请求参数.
   * @param {string} args.smser - 发送渠道.
   * @param {string} args.type - 短信类型.
   * @param {number} args.delay - 延迟时间(秒).
   * @param {Object} args.messages - 短信内容.
   * @param {string} args.admin_id - 管理员id.
   * @param {string} args.batch - 请求批次.
   * @return {Object} A promise object.
   */
  batchSend(args = {}) {
    return this.httpRequest(args, 'batchSend');
  }

  /**
   * 普通方式发送.
   * @param {Object} args - 请求参数.
   * @param {string} args.smser - 发送渠道.
   * @param {string} args.type - 短信类型.
   * @param {number} args.delay - 延迟时间(秒).
   * @param {Object[]} args.messages - 短信内容.
   * @param {string} args.admin_id - 管理员id.
   * @param {string} args.batch - 请求批次.
   * @return {Object} A promise object.
   */
  commonSend(args = {}) {
    return this.httpRequest(args, 'commonSend');
  }

  /**
   * 发送状态上报接口.
   * @param {string} mobile - 手机号.
   * @param {string} ssid - 第三方短信id.
   * @param {string} status - 状态.
   * @return {Object} A promise object.
   */
  report({
    mobile,
    ssid,
    status,
  }) {
    if (!mobile || !ssid || !status) {
      throw new Error('Invalid arguments!');
    }
    return this.httpRequest({
      mobile,
      ssid,
      status,
    }, 'report');
  }

  httpRequest(body, type) {
    return this.request({
      url: `${this.host}/${VERSION}${APIS[type]}`,
      method: 'POST',
      headers: {
        'content-type': 'application/json', // 必须为json方式请求
        'X-UUID': SMSClient.getUuid(), // 避免请求两次的token
      },
      body,
      timeout: 10000,
      json: true,
    });
  }

  static getUuid() {
    return uuid.v4();
  }
}
