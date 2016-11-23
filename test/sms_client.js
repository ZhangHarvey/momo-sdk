import test from 'ava';
import sinon from 'sinon';
import rp from 'request-promise';
import SMSClient from '../src/sms_client';

test('SMSClient send sms apis', t => {
  const host = 'http://127.0.0.1';
  const requestSpy = sinon.spy(rp);
  const smsClient = new SMSClient(host, true, requestSpy);
  const options = {
    smser: 'dahansantong',
    type: 'message',
    delay: 10, // 延迟时间
    messages: {
      mobile: '11111111111',
      content: '测试',
    },
    admin_id: 1, // 管理员
    batch: 'abcde', // 批次
  };
  smsClient.batchSend(options).then((res) => {
    console.log(res);
  });
  smsClient.mqSend(options).then((res) => {
    console.log(res);
  });
  smsClient.commonSend(options).then((res) => {
    console.log(res);
  });
  t.true(3 === requestSpy.callCount);
});

test('SMSClient report', t => {
  const host = 'http://127.0.0.1';
  const requestSpy = sinon.spy(rp);
  const smsClient = new SMSClient(host, true, requestSpy);
  const options = {
    mobile: '11111111111',
    ssid: 'abcde',
    status: 'done',
  };
  smsClient.report(options).then((res) => {
    console.log(res);
  });
  t.true(1 === requestSpy.callCount);
});
