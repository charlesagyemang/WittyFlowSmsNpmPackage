const axios =  require('axios')

class WFSms {

	constructor(appId, appSecret){
		this._appId = appId;
		this._appSecret = appSecret;
	}

	get appId(){
		return this._appId;
	}

	get appSecret() {
		return this._appSecret;
	}

	sendSms(from, to, message){

		const host = 'https://api.wittyflow.com/v1/messages/send';

		const bodyToSend = {
      from,
      to,
      type: '1',
      message,
      app_id: this._appId,
      app_secret: this._appSecret,
    };

    return axios.post(host, bodyToSend)
	}

	sendFlashMessage(from, to, message){

		const host = 'https://api.wittyflow.com/v1/messages/send';

		const bodyToSend = {
      from,
      to,
      type: '0',
      message,
      app_id: this._appId,
      app_secret: this._appSecret,
    };

    return axios.post(host, bodyToSend)
	}

}

module.exports = { WFSms }
