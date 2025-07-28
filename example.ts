/**
 * Witty Flow SMS - TypeScript Usage Example
 * 
 * This example demonstrates how to use the Witty Flow SMS SDK with TypeScript.
 * It shows proper typing and interfaces for all methods.
 */

import { WFClient } from './wittyFlowSms';

// Initialize the SMS client with proper typing
const smsClient: WFClient = new WFClient('your_app_id', 'your_app_secret');

/**
 * Demonstrate all features with TypeScript typing
 */
async function demonstrateTypedFeatures(): Promise<void> {
    console.log('🚀 Witty Flow SMS TypeScript Demo\n');

    try {
        // 1. Check Account Balance with typed response
        console.log('📊 Checking account balance...');
        const balance = await smsClient.getAccountBalance();
        
        // TypeScript knows the structure of balance.data
        console.log(`✅ Balance: ${balance.data.balance} ${balance.data.currency}`);
        console.log(`   Status: ${balance.status} (Code: ${balance.code})\n`);

        // 2. Send SMS with typed parameters and response
        console.log('📱 Sending SMS...');
        const smsResponse = await smsClient.sendSms(
            'MyApp',              // from: string
            '0244123456',         // to: string  
            'Hello TypeScript!'   // message: string
        );
        
        // TypeScript provides autocomplete for response properties
        console.log('✅ SMS sent successfully!');
        console.log(`   Message ID: ${smsResponse.data.message_id}`);
        console.log(`   Cost: ${smsResponse.data.cost}`);
        console.log(`   Segments: ${smsResponse.data.message_segments}`);
        console.log(`   Status: ${smsResponse.data.status}\n`);

        // Store message ID with proper typing
        const messageId: string = smsResponse.data.message_id;

        // 3. Send Flash Message
        console.log('⚡ Sending flash message...');
        const flashResponse = await smsClient.sendFlashMessage(
            'Alert',
            '0244123456',
            'URGENT: TypeScript flash message!'
        );
        
        console.log('✅ Flash message sent!');
        console.log(`   Message ID: ${flashResponse.data.message_id}`);
        console.log(`   Type: ${flashResponse.data.type}\n`);

        // 4. Check Message Status with typed response
        console.log('🔍 Checking message status...');
        const status = await smsClient.getSmsStatus(messageId);
        
        // TypeScript ensures type safety for all properties
        console.log('✅ Status retrieved!');
        console.log(`   Status: ${status.data.status}`);
        console.log(`   Billing: ${status.data.billing}`);
        console.log(`   Date: ${status.data.readable_date}\n`);

        console.log('🎉 TypeScript demo completed successfully!');

    } catch (error: unknown) {
        // Proper error handling with TypeScript
        if (error instanceof Error) {
            console.error('❌ Error occurred:', error.message);
            
            // Type-safe error handling
            if (error.message.includes('API Error')) {
                console.log('💡 API-related error detected');
            } else if (error.message.includes('Network Error')) {
                console.log('💡 Network connectivity issue detected');
            }
        } else {
            console.error('❌ Unknown error:', error);
        }
    }
}

/**
 * Interface for batch message configuration
 */
interface BatchMessage {
    to: string;
    content: string;
    priority?: 'normal' | 'high';
}

/**
 * Interface for batch result
 */
interface BatchResult {
    to: string;
    messageId?: string;
    status: 'sent' | 'failed';
    cost?: string;
    error?: string;
}

/**
 * Example: Send multiple messages with TypeScript
 */
async function sendTypedBatchMessages(): Promise<BatchResult[]> {
    console.log('\n📦 TypeScript Batch Message Example\n');

    const messages: BatchMessage[] = [
        { to: '0244123456', content: 'Welcome to our TypeScript service!', priority: 'high' },
        { to: '0501234567', content: 'Your order confirmation.', priority: 'normal' },
        { to: '0201234567', content: 'Thank you for choosing us!' }
    ];

    const results: BatchResult[] = [];

    for (const msg of messages) {
        try {
            console.log(`📤 Sending to ${msg.to} (Priority: ${msg.priority || 'normal'})...`);
            
            const result = await smsClient.sendSms('TypeScript', msg.to, msg.content);
            
            results.push({
                to: msg.to,
                messageId: result.data.message_id,
                status: 'sent',
                cost: result.data.cost
            });
            
            console.log(`✅ Sent successfully - ID: ${result.data.message_id}`);
            
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            
            console.error(`❌ Failed to send to ${msg.to}:`, errorMessage);
            
            results.push({
                to: msg.to,
                status: 'failed',
                error: errorMessage
            });
        }
    }

    console.log('\n📋 Typed Batch Results:');
    console.table(results);
    
    return results;
}

/**
 * Type-safe configuration interface
 */
interface SMSConfig {
    retryAttempts: number;
    retryDelayMs: number;
    timeoutMs: number;
}

/**
 * Enhanced SMS client with configuration
 */
class TypedSMSService {
    private client: WFClient;
    private config: SMSConfig;

    constructor(appId: string, appSecret: string, config: Partial<SMSConfig> = {}) {
        this.client = new WFClient(appId, appSecret);
        this.config = {
            retryAttempts: 3,
            retryDelayMs: 1000,
            timeoutMs: 30000,
            ...config
        };
    }

    /**
     * Send SMS with retry logic and proper typing
     */
    async sendWithRetry(from: string, to: string, message: string): Promise<string> {
        let lastError: Error;
        
        for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
            try {
                console.log(`📤 Attempt ${attempt} to send SMS...`);
                
                const response = await this.client.sendSms(from, to, message);
                
                console.log(`✅ SMS sent on attempt ${attempt}`);
                return response.data.message_id;
                
            } catch (error: unknown) {
                lastError = error instanceof Error ? error : new Error('Unknown error');
                
                if (attempt < this.config.retryAttempts) {
                    console.log(`⏳ Waiting ${this.config.retryDelayMs}ms before retry...`);
                    await new Promise(resolve => setTimeout(resolve, this.config.retryDelayMs));
                }
            }
        }
        
        throw new Error(`Failed after ${this.config.retryAttempts} attempts: ${lastError!.message}`);
    }
}

// Run the TypeScript demo
async function runTypedDemo(): Promise<void> {
    await demonstrateTypedFeatures();
    
    // Uncomment to run additional examples:
    // await sendTypedBatchMessages();
    
    // Example with enhanced service:
    // const enhancedService = new TypedSMSService('your_app_id', 'your_app_secret', {
    //     retryAttempts: 3,
    //     retryDelayMs: 2000
    // });
    // const messageId = await enhancedService.sendWithRetry('MyApp', '0244123456', 'Retry example');
    // console.log('Enhanced service message ID:', messageId);
}

// Execute the demo
runTypedDemo().catch((error: unknown) => {
    if (error instanceof Error) {
        console.error('Demo failed:', error.message);
    } else {
        console.error('Demo failed with unknown error:', error);
    }
});

// Export types and service for use in other files
export {
    BatchMessage,
    BatchResult,
    SMSConfig,
    TypedSMSService,
    demonstrateTypedFeatures,
    sendTypedBatchMessages
};