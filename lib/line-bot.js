'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _config2 = require('../config');

var _config3 = _interopRequireDefault(_config2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = '443';

var _config = _extends({}, _config3.default),
    CHANNEL_ID = _config.CHANNEL_ID,
    CHANNEL_SERECT = _config.CHANNEL_SERECT,
    MID = _config.MID;

var LINE_API = 'https://api.line.me/v2/bot/message/reply';

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.post('/callback', function (req, res) {
  // const result = req.body.result;
  var jsonData = req.body;

  if (jsonData.events[0].message.text.toString().indexOf("卡米狗;") !== -1) {
    sendTextMessage(jsonData.events[0].replyToken, "廢物還想教我說話?");
  } else if (jsonData.events[0].message.text.toString().indexOf("卡米狗") !== -1) {
    var num = Math.floor(Math.random() * 2 + 1);

    switch (num) {
      case 1:
        sendTextMessage(jsonData.events[0].replyToken, "叫我衝三小");
        break;
      case 2:
        sendTextMessage(jsonData.events[0].replyToken, "閉嘴");
        break;
      default:
        break;
    }
  } else if (jsonData.events[0].message.text.toString().indexOf("York") !== -1) {
    sendTextMessage(jsonData.events[0].replyToken, "好帥<3");
  } else if (jsonData.events[0].message.text.toString().indexOf("Curtis") !== -1) {
    sendTextMessage(jsonData.events[0].replyToken, "三峽宋仲基❤❤");
  }
});

app.listen(process.env.PORT || port, function () {
  return console.log(port);
});

function sendTextMessage(replyToken, msg) {

  var data = {
    replyToken: replyToken,
    messages: [{
      type: 'text',
      text: msg
    }]
  };

  console.log('send: ', data);

  (0, _request2.default)({
    url: LINE_API,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer {ksRLjdJg3EfxuhZxp1MGjoN3tNMrs6V/PKP+LXAhSknS//cb4DW8BrICja4jowHXG3Cqknj4j7S1OX1XGNX64M6aEiYCNxa2aB+aKWGLbXFEH+wPUev7CCgCMOp/UlFriVEjh3/m4pAcdt+N7f3t2wdB04t89/1O/w1cDnyilFU=}'
    },
    method: 'POST',
    body: JSON.stringify(data)
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
    console.log('send response: ', body);
  });
}