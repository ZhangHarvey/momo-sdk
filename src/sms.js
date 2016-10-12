import request from 'http_client';

const apis = {
  mqSend: '/v1/sms/mq_send',
};

export default class SMS {
  constructor(host) {
    if (!host) {
      throw new Error('Invalid arguments: host is empty!');
    }
    this.host = host;
  }

  mqSend({
    smser,
    type,
    messages,
    delay,
    adminId,
  }) {
    const form = {
      smser,
      type,
      messages,
      delay,
      admin_id: adminId,
    };
    return request({
      url: this.host + apis.mqSend,
      method: 'POST',
      form,
      timeout: 10000,
      useQuerystring: true,
    });
  }
}
