const axios = require('axios');

class WFClient {
	constructor(appId, appSecret) {
		if (!appId || !appSecret) {
			throw new Error('Both appId and appSecret are required');
		}
		this._appId = appId;
		this._appSecret = appSecret;
		this._baseUrl = 'https://api.wittyflow.com/v1';
	}

	get appId() {
		return this._appId;
	}

	get appSecret() {
		return this._appSecret;
	}

	/**
	 * Send a regular SMS message
	 * @param {string} from - Sender ID (max 14 characters)
	 * @param {string} to - Recipient phone number (format: 0244XXXXXX)
	 * @param {string} message - Message content (max 180 characters)
	 * @returns {Promise<Object>} API response
	 */
	async sendSms(from, to, message) {
		try {
			const url = `${this._baseUrl}/messages/send`;
			const data = {
				from,
				to: `233${to.substring(1)}`,
				type: '1',
				message,
				app_id: this._appId,
				app_secret: this._appSecret,
			};

			const response = await axios.post(url, data);
			return response.data;
		} catch (error) {
			throw this._handleError(error);
		}
	}

	/**
	 * Send a flash SMS message
	 * @param {string} from - Sender ID (max 14 characters)
	 * @param {string} to - Recipient phone number (format: 0244XXXXXX)
	 * @param {string} message - Message content (max 180 characters)
	 * @returns {Promise<Object>} API response
	 */
	async sendFlashMessage(from, to, message) {
		try {
			const url = `${this._baseUrl}/messages/send`;
			const data = {
				from,
				to: `233${to.substring(1)}`,
				type: '0',
				message,
				app_id: this._appId,
				app_secret: this._appSecret,
			};

			const response = await axios.post(url, data);
			return response.data;
		} catch (error) {
			throw this._handleError(error);
		}
	}

	/**
	 * Get account balance
	 * @returns {Promise<Object>} Account balance information
	 */
	async getAccountBalance() {
		try {
			const url = `${this._baseUrl}/account/balance`;
			const params = {
				app_id: this._appId,
				app_secret: this._appSecret
			};

			const response = await axios.get(url, { params });
			return response.data;
		} catch (error) {
			throw this._handleError(error);
		}
	}

	/**
	 * Get SMS delivery status
	 * @param {string} smsId - Message ID from send response
	 * @returns {Promise<Object>} Message status information
	 */
	async getSmsStatus(smsId) {
		try {
			const url = `${this._baseUrl}/messages/${smsId}/retrieve`;
			const params = {
				app_id: this._appId,
				app_secret: this._appSecret
			};

			const response = await axios.get(url, { params });
			return response.data;
		} catch (error) {
			throw this._handleError(error);
		}
	}

	/**
	 * Handle API errors consistently
	 * @private
	 */
	_handleError(error) {
		if (error.response) {
			// API responded with error status
			return new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
		} else if (error.request) {
			// Request was made but no response received
			return new Error('Network Error: No response from API');
		} else {
			// Something else happened
			return new Error(`Request Error: ${error.message}`);
		}
	}
}

module.exports = { WFClient };
