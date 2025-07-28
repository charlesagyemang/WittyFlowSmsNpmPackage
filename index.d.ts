/**
 * TypeScript definitions for witty-flow-sms
 */

/**
 * Response structure for successful API calls
 */
export interface WittyFlowResponse<T = any> {
  status: 'success';
  code: number;
  message: string;
  data: T;
}

/**
 * SMS message data returned when sending messages
 */
export interface MessageData {
  status: string;
  message_id: string;
  message: string;
  date_created: string;
  direction: string;
  from: string;
  to: string;
  type: string;
  message_segments: number;
  cost: string;
  service_rate: string;
  callback_url: string | null;
}

/**
 * SMS status data returned when checking message status
 */
export interface MessageStatusData {
  message_id: string;
  status: string;
  message: string;
  date: string;
  readable_date: string;
  direction: string;
  type: string;
  sender: string;
  recipient: string;
  message_segments: number;
  cost: string;
  rate: string;
  billing: string;
}

/**
 * Account balance data
 */
export interface BalanceData {
  balance: string;
  currency: string;
}

/**
 * Main WittyFlow SMS client class
 */
export declare class WFClient {
  /**
   * Create a new WittyFlow SMS client
   * @param appId - Your Witty Flow application ID
   * @param appSecret - Your Witty Flow application secret
   * @throws {Error} When appId or appSecret is missing
   */
  constructor(appId: string, appSecret: string);

  /**
   * Get the application ID
   */
  readonly appId: string;

  /**
   * Get the application secret
   */
  readonly appSecret: string;

  /**
   * Send a regular SMS message
   * @param from - Sender ID (maximum 14 characters)
   * @param to - Recipient phone number in format 0244XXXXXX
   * @param message - Message content (maximum 180 characters)
   * @returns Promise resolving to API response with message details
   * @throws {Error} When API call fails or network error occurs
   */
  sendSms(from: string, to: string, message: string): Promise<WittyFlowResponse<MessageData>>;

  /**
   * Send a flash SMS message (displays immediately on recipient's screen)
   * @param from - Sender ID (maximum 14 characters)
   * @param to - Recipient phone number in format 0244XXXXXX
   * @param message - Message content (maximum 180 characters)
   * @returns Promise resolving to API response with message details
   * @throws {Error} When API call fails or network error occurs
   */
  sendFlashMessage(from: string, to: string, message: string): Promise<WittyFlowResponse<MessageData>>;

  /**
   * Get the delivery status of a sent message
   * @param smsId - Message ID returned from sendSms() or sendFlashMessage()
   * @returns Promise resolving to message status information
   * @throws {Error} When API call fails or network error occurs
   */
  getSmsStatus(smsId: string): Promise<WittyFlowResponse<MessageStatusData>>;

  /**
   * Get current account balance
   * @returns Promise resolving to account balance information
   * @throws {Error} When API call fails or network error occurs
   */
  getAccountBalance(): Promise<WittyFlowResponse<BalanceData>>;
}