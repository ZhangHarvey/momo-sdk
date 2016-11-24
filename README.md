# momodani-sdk
[![npm version](https://badge.fury.io/js/momodani-sdk.svg)](https://badge.fury.io/js/momodani-sdk)
[![Build Status](https://api.travis-ci.org/bmqb/momodani-sdk.svg?branch=master)](https://travis-ci.org/bmqb/momodani-sdk)

贝米钱包momodani服务sdk

## 安装：
```
npm install momodani-sdk --save
```

## 功能：
### SMS短信相关：
- mqSend: 队列普通发送
- batchSend: 队列批量发送
- commonSend: 不通过消息队列直接发送
- report: 状态上报接口