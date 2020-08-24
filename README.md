### WITTY FLOW SMS NPM PACKAGE

#### Step 1: Install The Package Via Yarn Or Npm

#### Via Yarn
```javascript
  yarn add witty-flow-sms
```

#### Via Npm
```javascript
  npm i witty-flow-sms
```

### Step 2: Initialize

```javascript
  // IMPORT   
  // Style One
  import { WFClient } from 'witty-flow-sms';
  // Style Two
  const { WFClient } = require('witty-flow-sms');

  // Create An Instance Of The Class You Imported And Pass The App ID And App Secret
  const wittySmsClient = new WFClient('app_id_here', 'app_secret_here');

```
### Usage

### Send Text Message
```javascript
  // SEND SMS
  // sendMessage Takes 3 Params (from, to, message)
  // from => string should not be more than 14 characters
  // to => string should take the 0244XXXXXX format
  // message => string should not me more than 180 characters
  const sendMessage = await wittySmsClient.sendSms('Ghana', '0541348180', 'New message');

  // OnSuccess Response
  {
    "status": "success",
    "code": 2020,
    "message": "Accpeted for delivery",
    "data": {
        "status": "accepted",
        "message_id": "ebb04f7f-147f-4d17-877b-8dd8af4ed2fe",
        "message": "New message",
        "date_created": "2020-08-24T00:17:09.000000Z",
        "direction": "MT",
        "from": "Ghana",
        "to": "233541348180",
        "type": "plain",
        "message_segments": 1,
        "cost": "0.03",
        "service_rate": "0.030000",
        "callback_url": null
    }
}

```

### Send Flash Message
```javascript
  // SEND Flash Message
  // sendFlashMessage Takes 3 Params (from, to, message)
  // from => string should not be more than 14 characters
  // to => string should take the 0244XXXXXX format
  // message => string should not me more than 180 characters
  const sendFlashMessage = await wittySmsClient.sendFlashMessage('Ghana', '0541348180', 'New message');

  // OnSuccess Response
  {
    "status": "success",
    "code": 2020,
    "message": "Accpeted for delivery",
    "data": {
        "status": "accepted",
        "message_id": "14291778-aacb-4e91-ac0c-8da6b64c75ed",
        "message": "News message",
        "date_created": "2020-08-24T00:19:37.000000Z",
        "direction": "MT",
        "from": "Kumi",
        "to": "233541348180",
        "type": "flash",
        "message_segments": 1,
        "cost": "0.03",
        "service_rate": "0.030000",
        "callback_url": null
    }
}
```

### Get Sms Status
```javascript
  // Get Sms Status
  // getSmsStatus Takes 1 Param (message_id)
  // message_id => string
  const getSmsStatus = await wittySmsClient.getSmsStatus('8048d233-f7bf-49eb-8b97-71362b929e7b');

  // OnSuccess Response
  {
    "status": "success",
    "code": 2000,
    "message": "Message retrieved",
    "data": {
        "message_id": "8048d233-f7bf-49eb-8b97-71362b929e7b",
        "status": "delivered",
        "message": "New message",
        "date": "2020-08-23T23:54:04.000000Z",
        "readable_date": "Sun August 23, 2020 11:54:04 PM",
        "direction": "MT",
        "type": "1",
        "sender": "Ghana",
        "recipient": "233541348180",
        "message_segments": 1,
        "cost": "0.03",
        "rate": "0.030000",
        "billing": "charged"
    }
}
```


### Get Account Balance
```javascript
  const getAccountBalance = await wittySmsClient.getAccountBalance();
  // OnSuccess Response
  {
    "status": "success",
    "code": 2000,
    "message": "Balance Retrieved",
    "data": {
        "balance": "19.19",
        "currency": "GHS"
    }
}
```
