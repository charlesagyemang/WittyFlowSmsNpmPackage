const axios = require('axios')

class WFClient {

	constructor(appId, appSecret) {
		this._appId = appId;
		this._appSecret = appSecret;
	}

	get appId() {
		return this._appId;
	}

	get appSecret() {
		return this._appSecret;
	}

	sendSms(from, to, message) {
		return new Promise(async (resolve, reject) => {
			const host = 'https://api.wittyflow.com/v1/messages/send';
			const bodyToSend = {
				from,
				to: `233${to.substring(1)}`,
				type: '1',
				message,
				app_id: this._appId,
				app_secret: this._appSecret,
			};

			// sending message
			try {
				const response = await axios.post(host, bodyToSend);
				resolve(response.data);
			} catch (error) {
				reject(error);
			}
		})
	}

	sendFlashMessage(from, to, message) {
		return new Promise(async (resolve, reject) => {
			const host = 'https://api.wittyflow.com/v1/messages/send';
			const bodyToSend = {
				from,
				to: `233${to.substring(1)}`,
				type: '0',
				message,
				app_id: this._appId,
				app_secret: this._appSecret,
			};

			// sending message
			try {
				const response = await axios.post(host, bodyToSend);
				resolve(response.data);
			} catch (error) {
				reject(error);
			}
		})
	}

	getAccountBalance() {
		return new Promise(async (resolve, reject) => {
			const host = `https://api.wittyflow.com/v1/account/balance?app_id=${this._appId}&app_secret=${this._appSecret}`;

			// getting balance
			try {
				const response = await axios.get(host);
				resolve(response.data);
			} catch (error) {
				reject(error);
			}
		})
	}

	getSmsStatus(smsId) {
		return new Promise(async (resolve, reject) => {
			const host = `https://api.wittyflow.com/v1/messages/${smsId}/retrieve?app_id=${this._appId}&app_secret=${this._appSecret}`

			// getting status
			try {
				const response = await axios.get(host);
				resolve(response.data);
			} catch (error) {
				reject(error);
			}
		})
	}

}

module.exports = { WFClient }
