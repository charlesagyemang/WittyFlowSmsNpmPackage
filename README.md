# Witty Flow SMS - Node.js SDK

[![npm version](https://badge.fury.io/js/witty-flow-sms.svg)](https://badge.fury.io/js/witty-flow-sms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern Node.js SDK for the Witty Flow SMS API. Send SMS messages, flash messages, check delivery status, and manage your account balance with ease.

## Features

- 📱 Send regular SMS messages
- ⚡ Send flash SMS messages  
- 📊 Check message delivery status
- 💰 Get account balance
- 🔒 Built-in error handling
- 📝 Full TypeScript support with type definitions
- ✅ Modern async/await API
- 🛡️ Input validation
- 🎯 TypeScript autocomplete and IntelliSense
- 📦 Works with both JavaScript and TypeScript projects

## Installation

### Using npm
```bash
npm install witty-flow-sms
```

### Using yarn
```bash
yarn add witty-flow-sms
```

## Quick Start

### JavaScript
```javascript
const { WFClient } = require('witty-flow-sms');

// Initialize the client
const smsClient = new WFClient('your_app_id', 'your_app_secret');

// Send a message
async function sendMessage() {
  try {
    const result = await smsClient.sendSms('MyApp', '0244123456', 'Hello World!');
    console.log('Message sent:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

sendMessage();
```

### TypeScript
```typescript
import { WFClient } from 'witty-flow-sms';

// Initialize with type safety
const smsClient: WFClient = new WFClient('your_app_id', 'your_app_secret');

// Send a message with full typing
async function sendMessage(): Promise<void> {
  try {
    const result = await smsClient.sendSms('MyApp', '0244123456', 'Hello TypeScript!');
    
    // TypeScript provides autocomplete for response properties
    console.log(`Message sent: ${result.data.message_id}`);
    console.log(`Cost: ${result.data.cost}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    }
  }
}

sendMessage();
```

## Running the Demo

The package includes comprehensive example files that demonstrate all features:

### JavaScript Demo
```bash
# Run the JavaScript demo
npm run demo

# Or run directly
node example.js
```

### TypeScript Demo
```bash
# Run the TypeScript demo (requires TypeScript)
npm run demo:ts

# Or install TypeScript and run directly
npm install -g typescript ts-node
npx ts-node example.ts
```

**Note:** Remember to replace `'your_app_id'` and `'your_app_secret'` in the example files with your actual Witty Flow credentials before running the demos.

## API Reference

### Constructor

```javascript
const client = new WFClient(appId, appSecret);
```

**Parameters:**
- `appId` (string, required) - Your Witty Flow application ID
- `appSecret` (string, required) - Your Witty Flow application secret

**Throws:** Error if `appId` or `appSecret` is missing

### Methods

#### `sendSms(from, to, message)`

Send a regular SMS message.

**Parameters:**
- `from` (string) - Sender ID (maximum 14 characters)
- `to` (string) - Recipient phone number in format `0244XXXXXX`
- `message` (string) - Message content (maximum 180 characters)

**Returns:** Promise<Object> - API response with message details

**Example:**
```javascript
const response = await smsClient.sendSms('MyCompany', '0244123456', 'Your order is ready!');
console.log(response);
```

**Success Response:**
```json
{
  "status": "success",
  "code": 2020,
  "message": "Accepted for delivery",
  "data": {
    "status": "accepted",
    "message_id": "ebb04f7f-147f-4d17-877b-8dd8af4ed2fe",
    "message": "Your order is ready!",
    "date_created": "2020-08-24T00:17:09.000000Z",
    "direction": "MT",
    "from": "MyCompany",
    "to": "233244123456",
    "type": "plain",
    "message_segments": 1,
    "cost": "0.03",
    "service_rate": "0.030000",
    "callback_url": null
  }
}
```

#### `sendFlashMessage(from, to, message)`

Send a flash SMS message (displays immediately on recipient's screen).

**Parameters:**
- `from` (string) - Sender ID (maximum 14 characters)
- `to` (string) - Recipient phone number in format `0244XXXXXX`
- `message` (string) - Message content (maximum 180 characters)

**Returns:** Promise<Object> - API response with message details

**Example:**
```javascript
const response = await smsClient.sendFlashMessage('Alert', '0244123456', 'Emergency: Please check your email');
console.log(response);
```

#### `getSmsStatus(messageId)`

Check the delivery status of a sent message.

**Parameters:**
- `messageId` (string) - Message ID returned from `sendSms()` or `sendFlashMessage()`

**Returns:** Promise<Object> - Message status information

**Example:**
```javascript
const status = await smsClient.getSmsStatus('ebb04f7f-147f-4d17-877b-8dd8af4ed2fe');
console.log(status);
```

**Success Response:**
```json
{
  "status": "success",
  "code": 2000,
  "message": "Message retrieved",
  "data": {
    "message_id": "ebb04f7f-147f-4d17-877b-8dd8af4ed2fe",
    "status": "delivered",
    "message": "Your order is ready!",
    "date": "2020-08-23T23:54:04.000000Z",
    "readable_date": "Sun August 23, 2020 11:54:04 PM",
    "direction": "MT",
    "type": "1",
    "sender": "MyCompany",
    "recipient": "233244123456",
    "message_segments": 1,
    "cost": "0.03",
    "rate": "0.030000",
    "billing": "charged"
  }
}
```

#### `getAccountBalance()`

Get your current account balance.

**Returns:** Promise<Object> - Account balance information

**Example:**
```javascript
const balance = await smsClient.getAccountBalance();
console.log(`Balance: ${balance.data.balance} ${balance.data.currency}`);
```

**Success Response:**
```json
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

## Complete Example

```javascript
const { WFClient } = require('witty-flow-sms');

async function smsExample() {
  // Initialize client
  const client = new WFClient('your_app_id', 'your_app_secret');
  
  try {
    // Check account balance
    const balance = await client.getAccountBalance();
    console.log(`Account Balance: ${balance.data.balance} ${balance.data.currency}`);
    
    // Send a message
    const messageResponse = await client.sendSms(
      'MyApp',
      '0244123456', 
      'Hello! This is a test message.'
    );
    
    console.log('Message sent successfully:', messageResponse.data.message_id);
    
    // Check message status
    const status = await client.getSmsStatus(messageResponse.data.message_id);
    console.log('Message status:', status.data.status);
    
  } catch (error) {
    console.error('SMS Error:', error.message);
  }
}

smsExample();
```

## Error Handling

The SDK provides detailed error messages for different scenarios:

```javascript
try {
  await smsClient.sendSms('', '0244123456', 'Test');
} catch (error) {
  if (error.message.includes('API Error')) {
    // Handle API errors (4xx, 5xx responses)
    console.log('API Error:', error.message);
  } else if (error.message.includes('Network Error')) {
    // Handle network connectivity issues
    console.log('Network Error:', error.message);
  } else {
    // Handle other errors (validation, etc.)
    console.log('Error:', error.message);
  }
}
```

## Phone Number Format

**Important:** Phone numbers must be in Ghana format starting with `0`:
- ✅ Correct: `0244123456`, `0501234567`, `0201234567`
- ❌ Incorrect: `+233244123456`, `233244123456`, `244123456`

The SDK automatically converts `0244123456` to `233244123456` for the API.

## Message Limits

- **Sender ID:** Maximum 14 characters
- **Message Content:** Maximum 180 characters
- **Flash Messages:** Same limits as regular SMS

## TypeScript Support

This package includes comprehensive TypeScript definitions and examples:

### Type Definitions
- ✅ Full type definitions for all methods and responses
- ✅ IntelliSense support in VS Code and other TypeScript-aware editors
- ✅ Compile-time type checking
- ✅ Generic interfaces for API responses

### Available Types
```typescript
import { 
  WFClient,           // Main client class
  WittyFlowResponse,  // Generic response interface
  MessageData,        // SMS message response data
  MessageStatusData,  // Message status response data
  BalanceData        // Account balance response data
} from 'witty-flow-sms';
```

### Example with Types
```typescript
import { WFClient, WittyFlowResponse, MessageData } from 'witty-flow-sms';

const client = new WFClient('app_id', 'app_secret');

// TypeScript knows the exact return type
const response: WittyFlowResponse<MessageData> = await client.sendSms(
  'Sender', 
  '0244123456', 
  'Hello TypeScript!'
);

// Full autocomplete available
console.log(response.data.message_id);
console.log(response.data.cost);
```

## Requirements

- Node.js >= 12.0.0
- Valid Witty Flow API credentials
- TypeScript >= 4.0 (for TypeScript usage)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 🐛 [Report Issues](https://github.com/charlesagyemang/WittyFlowSmsNpmPackage/issues)
- 📧 Contact: Create an issue for support questions
- 📖 [Witty Flow API Documentation](https://wittyflow.com/docs)

## Authors

- **Charles Opoku-Agyemang**
- **Kingsley Ofosu**

---

Made with ❤️ for the Ghanaian developer community
