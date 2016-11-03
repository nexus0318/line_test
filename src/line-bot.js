import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import config from '../config';

const app = express();
const port = '443';
const { CHANNEL_ID, CHANNEL_SERECT, MID } = {...config};
const LINE_API = 'https://api.line.me/v2/bot/message/reply';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/callback', (req, res) => {
 // const result = req.body.result;
    var jsonData = req.body ;
    console.log('receive: ', jsonData);
    console.log('type: ', jsonData.events[0].type);
    console.log('replyToken: ', jsonData.events[0].replyToken);
    console.log('source: ', jsonData.events[0].message);


    sendTextMessage(jsonData.events[0].replyToken, jsonData.events[0].message.text);
  
});

app.listen(process.env.PORT || port, () => console.log(port));

function sendTextMessage(replyToken, msg) {

  const data = {
    replyToken: replyToken,
    messages: {
      type: 'text',
      text: msg
    }
  };

  console.log('send: ', data);

  request({
    url: LINE_API,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer {ksRLjdJg3EfxuhZxp1MGjoN3tNMrs6V/PKP+LXAhSknS//cb4DW8BrICja4jowHXG3Cqknj4j7S1OX1XGNX64M6aEiYCNxa2aB+aKWGLbXFEH+wPUev7CCgCMOp/UlFriVEjh3/m4pAcdt+N7f3t2wdB04t89/1O/w1cDnyilFU=}',
    },
    method: 'POST',
    body: JSON.stringify(data) 
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
    console.log('send response: ', body);
  });
}