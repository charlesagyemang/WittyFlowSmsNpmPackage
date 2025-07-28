# Witty Flow SMS - Node.js SDK

[![npm version](https://badge.fury.io/js/witty-flow-sms.svg)](https://badge.fury.io/js/witty-flow-sms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A modern Node.js SDK for the Witty Flow SMS API with **full TypeScript support**. Send SMS messages, flash messages, check delivery status, and manage your account balance with complete type safety and IntelliSense.

## Features

### Core Functionality
- 📱 Send regular SMS messages
- ⚡ Send flash SMS messages  
- 📊 Check message delivery status
- 💰 Get account balance
- 🔒 Built-in error handling
- 🛡️ Input validation

### Developer Experience
- 🎯 **Full TypeScript support** with complete type definitions
- 💡 **IntelliSense & autocomplete** in VS Code and other editors
- 🔍 **Compile-time type checking** - catch errors before runtime
- 📝 **Type-safe API responses** - know exactly what properties are available
- ✅ **Modern async/await API**
- 🛡️ **Comprehensive input validation** - prevents runtime errors
- 📦 **Dual support** - works perfectly with both JavaScript and TypeScript

## Installation

### Using npm
```bash
npm install witty-flow-sms
```

### Using yarn
```bash
yarn add witty-flow-sms
```

> **TypeScript users:** No additional `@types` package needed! Type definitions are included out of the box.

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
import { WFClient, WittyFlowResponse, MessageData } from 'witty-flow-sms';

// Initialize with type safety
const smsClient: WFClient = new WFClient('your_app_id', 'your_app_secret');

// Send a message with full typing
async function sendMessage(): Promise<void> {
  try {
    // TypeScript knows the exact return type
    const result: WittyFlowResponse<MessageData> = await smsClient.sendSms(
      'MyApp', 
      '0244123456', 
      'Hello TypeScript!'
    );
    
    // Full autocomplete and type checking
    console.log(`Message sent: ${result.data.message_id}`);
    console.log(`Cost: ${result.data.cost}`);
    console.log(`Status: ${result.data.status}`);
    console.log(`Segments: ${result.data.message_segments}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    }
  }
}

sendMessage();
```

**Key TypeScript Benefits:**
- ✅ **Autocomplete** - Your editor suggests available properties
- ✅ **Type Safety** - Catch typos and errors at compile time  
- ✅ **IntelliSense** - See method signatures and documentation
- ✅ **Refactoring** - Rename variables safely across your project

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

## 🚀 Quick TypeScript Setup

1. **Install the package** (types included automatically):
   ```bash
   npm install witty-flow-sms
   ```

2. **Import with full typing**:
   ```typescript
   import { WFClient, WittyFlowResponse, MessageData } from 'witty-flow-sms';
   ```

3. **Get instant IntelliSense**:
   ```typescript
   const client = new WFClient('app_id', 'secret');
   // Your editor now provides autocomplete and type checking!
   ```

## API Reference

> 💡 **TypeScript Users:** All methods below include full type definitions. Your editor will provide autocomplete, parameter hints, and return type information automatically.

### Constructor

**JavaScript:**
```javascript
const client = new WFClient(appId, appSecret);
```

**TypeScript:**
```typescript
const client: WFClient = new WFClient(appId, appSecret);
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

**JavaScript Example:**
```javascript
const response = await smsClient.sendSms('MyCompany', '0244123456', 'Your order is ready!');
console.log(response);
```

**TypeScript Example:**
```typescript
import { WittyFlowResponse, MessageData } from 'witty-flow-sms';

const response: WittyFlowResponse<MessageData> = await smsClient.sendSms(
  'MyCompany', 
  '0244123456', 
  'Your order is ready!'
);

// Full type safety and autocomplete
console.log(`Message ID: ${response.data.message_id}`);
console.log(`Cost: ${response.data.cost}`);
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
- ✅ Correct: `0244123456`, `0501234567`, `0201234567`, `0262345678`
- ❌ Incorrect: `+233244123456`, `233244123456`, `244123456`, `0123456789`

**Validation Rules:**
- Must start with `0`
- Must be exactly 10 digits
- Second digit must be 2, 3, 4, or 5 (valid Ghana network codes)
- Examples: `024XXXXXXX`, `025XXXXXXX`, `026XXXXXXX`, `027XXXXXXX`, `050XXXXXXX`

The SDK automatically converts `0244123456` to `233244123456` for the API and validates the format before sending.

## Message Limits

- **Sender ID:** Maximum 14 characters
- **Message Content:** Maximum 180 characters
- **Flash Messages:** Same limits as regular SMS

## 🎯 TypeScript Developer Guide

This package is built with **first-class TypeScript support**. No additional setup required!

### 📦 What's Included
- ✅ **Complete type definitions** for all classes, methods, and responses
- ✅ **Generic interfaces** for type-safe API responses
- ✅ **IntelliSense support** in VS Code, WebStorm, and other editors
- ✅ **Compile-time error checking** to catch issues before runtime
- ✅ **Zero additional dependencies** - types included in the main package

### 🔧 Available Types & Interfaces

```typescript
import { 
  // Main Classes
  WFClient,                    // SMS client class
  
  // Response Types
  WittyFlowResponse<T>,       // Generic API response wrapper
  
  // Data Interfaces  
  MessageData,                // SMS send response data
  MessageStatusData,          // Message status response data
  BalanceData,               // Account balance data
} from 'witty-flow-sms';
```

### 💡 TypeScript Usage Examples

#### Basic Setup with Types
```typescript
import { WFClient } from 'witty-flow-sms';

// Type-safe client initialization
const client: WFClient = new WFClient('your_app_id', 'your_app_secret');
```

#### Sending SMS with Full Type Safety
```typescript
import { WFClient, WittyFlowResponse, MessageData } from 'witty-flow-sms';

async function sendTypedSMS(): Promise<string> {
  const client = new WFClient('app_id', 'secret');
  
  // TypeScript knows the exact return type
  const response: WittyFlowResponse<MessageData> = await client.sendSms(
    'MyApp',
    '0244123456', 
    'Hello from TypeScript!'
  );
  
  // Autocomplete works for all properties
  return response.data.message_id; // Type: string
}
```

#### Advanced: Type-Safe Error Handling
```typescript
import { WFClient, MessageData, BalanceData } from 'witty-flow-sms';

class SMSService {
  private client: WFClient;
  
  constructor(appId: string, appSecret: string) {
    this.client = new WFClient(appId, appSecret);
  }
  
  async sendWithBalanceCheck(
    from: string, 
    to: string, 
    message: string
  ): Promise<{ sent: boolean; messageId?: string; balance: string }> {
    try {
      // Check balance first - TypeScript knows the return type
      const balanceResponse = await this.client.getAccountBalance();
      const balance: string = balanceResponse.data.balance;
      
      if (parseFloat(balance) < 0.05) {
        return { sent: false, balance };
      }
      
      // Send message - TypeScript provides full autocomplete
      const smsResponse = await this.client.sendSms(from, to, message);
      
      return {
        sent: true,
        messageId: smsResponse.data.message_id,
        balance: balance
      };
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`SMS service error: ${error.message}`);
      }
      throw error;
    }
  }
}
```

#### Interface Definitions Reference
```typescript
// All response data follows this structure
interface WittyFlowResponse<T> {
  status: 'success';
  code: number;
  message: string;
  data: T;
}

// SMS send response data
interface MessageData {
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

// Message status response data  
interface MessageStatusData {
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

// Account balance response data
interface BalanceData {
  balance: string;
  currency: string;
}
```

### 🛠️ TypeScript Configuration Tips

Add to your `tsconfig.json` for optimal experience:
```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node"
  }
}
```

### 📝 IntelliSense Features You Get

- **Method signatures** with parameter hints
- **Return type information** 
- **Property autocomplete** on response objects
- **Import suggestions** when typing
- **Error squiggles** for type mismatches
- **Go to definition** for interfaces
- **Hover documentation** for all methods

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
