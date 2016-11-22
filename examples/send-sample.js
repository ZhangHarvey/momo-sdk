import { SMSClient } from '../src';

const host = 'http://127.0.0.1';
const smsClient = new SMSClient(host);

// 普通方式发送
smsClient.commonSend({
  smser: 'dahansantong',
  type: 'message',
  delay: 10, // 延迟时间
  messages: {
    mobile: '11111111111',
    content: '测试',
  },
  admin_id: 1, // 管理员
  batch: 'abcde', // 批次
}).then((res) => {
  console.log(res);
});

// 队列单次方式发送
smsClient.mqSend({
  smser: 'dahansantong',
  type: 'message',
  delay: 10, // 延迟时间
  messages: {
    mobile: '11111111111',
    content: '测试',
  },
  admin_id: 1, // 管理员
  batch: 'abcde', // 批次
}).then((res) => {
  console.log(res);
});

// 队列批量发送方式
// 最大发送量 1万条
smsClient.batchSend({
  smser: 'dahansantong',
  type: 'message',
  delay: 10, // 延迟时间
  messages: [
    {
      mobile: '11111111111',
      content: '测试',
    },
    {
      mobile: '11111111112',
      content: '测试',
    },
  ],
  admin_id: 1, // 管理员
  batch: 'abcde', // 批次
}).then((res) => {
  console.log(res);
});
