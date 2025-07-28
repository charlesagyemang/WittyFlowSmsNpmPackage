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
			// Validate input parameters
			this._validateSmsInputs(from, to, message);
			
			const url = `${this._baseUrl}/messages/send`;
			const data = {
				from,
				to: this._formatPhoneNumber(to),
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
			// Validate input parameters
			this._validateSmsInputs(from, to, message);
			
			const url = `${this._baseUrl}/messages/send`;
			const data = {
				from,
				to: this._formatPhoneNumber(to),
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
			// Validate message ID
			if (!smsId || typeof smsId !== 'string') {
				throw new Error('Message ID (smsId) is required and must be a string');
			}
			
			if (smsId.trim().length === 0) {
				throw new Error('Message ID (smsId) cannot be empty');
			}
			
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
	 * Validate SMS input parameters
	 * @private
	 * @param {string} from - Sender ID
	 * @param {string} to - Recipient phone number
	 * @param {string} message - Message content
	 */
	_validateSmsInputs(from, to, message) {
		if (!from || typeof from !== 'string') {
			throw new Error('Sender ID (from) is required and must be a string');
		}
		
		if (from.length > 14) {
			throw new Error('Sender ID (from) must not exceed 14 characters');
		}
		
		if (!to || typeof to !== 'string') {
			throw new Error('Recipient phone number (to) is required and must be a string');
		}
		
		if (!message || typeof message !== 'string') {
			throw new Error('Message content is required and must be a string');
		}
		
		if (message.length > 180) {
			throw new Error('Message content must not exceed 180 characters');
		}
		
		// Validate Ghana phone number format
		if (!this._isValidGhanaPhoneNumber(to)) {
			throw new Error('Invalid phone number format. Expected Ghana format: 0XXXXXXXXX (e.g., 0244123456)');
		}
	}

	/**
	 * Validate Ghana phone number format
	 * @private
	 * @param {string} phoneNumber - Phone number to validate
	 * @returns {boolean} True if valid Ghana phone number format
	 */
	_isValidGhanaPhoneNumber(phoneNumber) {
		// Ghana phone number should start with 0 and be 10 digits total
		// Valid formats: 024XXXXXXX, 025XXXXXXX, 026XXXXXXX, 027XXXXXXX, 028XXXXXXX, 050XXXXXXX, etc.
		const ghanaPhoneRegex = /^0[2-5][0-9]{8}$/;
		return ghanaPhoneRegex.test(phoneNumber);
	}

	/**
	 * Format phone number for API (convert from 0XXXXXXXXX to 233XXXXXXXXX)
	 * @private
	 * @param {string} phoneNumber - Ghana phone number starting with 0
	 * @returns {string} Formatted phone number for API
	 */
	_formatPhoneNumber(phoneNumber) {
		// Remove leading 0 and prepend 233 (Ghana country code)
		return `233${phoneNumber.substring(1)}`;
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
