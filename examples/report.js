import { SMSClient } from '../src';

const host = 'http://127.0.0.1';
const smsClient = new SMSClient(host);

// 发送状态上报接口
smsClient.report({
  mobile: '11111111111',
  ssid: 'abcdefghijk',
  status: 'done', // [failed|done]
}).then(res => {
  console.log(res);
})
