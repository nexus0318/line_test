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

    if(jsonData.events[0].message.text.toString().indexOf("卡米狗;") !== -1)
    {
       sendTextMessage(jsonData.events[0].replyToken, "廢物還想教我說話?");
    }
    else if(jsonData.events[0].message.text.toString().indexOf("卡米狗") !== -1)
    {
       var num = Math.floor((Math.random() * 2) + 1);

       switch(num) {
        case 1:
            sendTextMessage(jsonData.events[0].replyToken, "叫我衝三小");
            break;
        case 2:
            sendTextMessage(jsonData.events[0].replyToken, "閉嘴");
            break;
        default:
            break;
        }

    }
    else if(jsonData.events[0].message.text.toString().indexOf("York") !== -1)
    {
       sendTextMessage(jsonData.events[0].replyToken, "好帥<3");
    }
  
});

app.listen(process.env.PORT || port, () => console.log(port));

function sendTextMessage(replyToken, msg) {

  const data = {
    replyToken: replyToken,
    messages: [{
      type: 'text',
      text: msg
    }]
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