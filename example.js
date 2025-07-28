/**
 * Witty Flow SMS - Complete Usage Example
 * 
 * This example demonstrates how to use all features of the Witty Flow SMS SDK.
 * Make sure to replace 'your_app_id' and 'your_app_secret' with your actual credentials.
 */

const { WFClient } = require('./wittyFlowSms');

// Initialize the SMS client with your credentials
const smsClient = new WFClient('your_app_id', 'your_app_secret');

async function demonstrateAllFeatures() {
    console.log('🚀 Witty Flow SMS SDK Demo\n');

    try {
        // 1. Check Account Balance
        console.log('📊 Checking account balance...');
        const balance = await smsClient.getAccountBalance();
        console.log(`✅ Balance: ${balance.data.balance} ${balance.data.currency}\n`);

        // 2. Send a Regular SMS
        console.log('📱 Sending regular SMS...');
        const smsResponse = await smsClient.sendSms(
            'MyApp',              // Sender ID (max 14 chars)
            '0244123456',         // Recipient (Ghana format)
            'Hello! This is a test message from Witty Flow SMS SDK.'
        );
        
        console.log('✅ SMS sent successfully!');
        console.log(`   Message ID: ${smsResponse.data.message_id}`);
        console.log(`   Cost: ${smsResponse.data.cost} ${smsResponse.data.service_rate}`);
        console.log(`   Status: ${smsResponse.data.status}\n`);

        // Store message ID for status check
        const messageId = smsResponse.data.message_id;

        // 3. Send a Flash Message
        console.log('⚡ Sending flash SMS...');
        const flashResponse = await smsClient.sendFlashMessage(
            'Alert',              // Sender ID
            '0244123456',         // Recipient
            'URGENT: This is a flash message that appears immediately!'
        );
        
        console.log('✅ Flash SMS sent successfully!');
        console.log(`   Message ID: ${flashResponse.data.message_id}`);
        console.log(`   Type: ${flashResponse.data.type}\n`);

        // 4. Check Message Status
        console.log('🔍 Checking message status...');
        const status = await smsClient.getSmsStatus(messageId);
        
        console.log('✅ Message status retrieved!');
        console.log(`   Status: ${status.data.status}`);
        console.log(`   Sent: ${status.data.readable_date}`);
        console.log(`   Billing: ${status.data.billing}\n`);

        console.log('🎉 Demo completed successfully!');

    } catch (error) {
        console.error('❌ Error occurred:', error.message);
        
        // Handle different types of errors
        if (error.message.includes('API Error')) {
            console.log('💡 This appears to be an API-related error. Check your credentials and try again.');
        } else if (error.message.includes('Network Error')) {
            console.log('💡 This appears to be a network connectivity issue. Check your internet connection.');
        } else if (error.message.includes('app_id') || error.message.includes('app_secret')) {
            console.log('💡 Please make sure to replace "your_app_id" and "your_app_secret" with your actual credentials.');
        }
    }
}

// Example: Send multiple messages in batch
async function sendBatchMessages() {
    console.log('\n📦 Batch Message Example\n');

    const messages = [
        { to: '0244123456', content: 'Message 1: Welcome to our service!' },
        { to: '0501234567', content: 'Message 2: Your order has been confirmed.' },
        { to: '0201234567', content: 'Message 3: Thank you for your purchase!' }
    ];

    const results = [];

    for (const msg of messages) {
        try {
            console.log(`📤 Sending to ${msg.to}...`);
            const result = await smsClient.sendSms('MyShop', msg.to, msg.content);
            results.push({
                to: msg.to,
                messageId: result.data.message_id,
                status: 'sent',
                cost: result.data.cost
            });
            console.log(`✅ Sent successfully - ID: ${result.data.message_id}`);
        } catch (error) {
            console.error(`❌ Failed to send to ${msg.to}:`, error.message);
            results.push({
                to: msg.to,
                status: 'failed',
                error: error.message
            });
        }
    }

    console.log('\n📋 Batch Results Summary:');
    console.table(results);
}

// Example: Monitor message delivery
async function monitorDelivery(messageId) {
    console.log(`\n👀 Monitoring delivery for message: ${messageId}\n`);
    
    const maxAttempts = 5;
    const delaySeconds = 10;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const status = await smsClient.getSmsStatus(messageId);
            const currentStatus = status.data.status;
            
            console.log(`📊 Attempt ${attempt}: Status = ${currentStatus}`);
            
            if (currentStatus === 'delivered' || currentStatus === 'failed') {
                console.log(`🏁 Final status reached: ${currentStatus}`);
                break;
            }
            
            if (attempt < maxAttempts) {
                console.log(`⏳ Waiting ${delaySeconds} seconds before next check...\n`);
                await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
            }
        } catch (error) {
            console.error(`❌ Error checking status:`, error.message);
            break;
        }
    }
}

// Run the demo
async function runDemo() {
    // Basic demo
    await demonstrateAllFeatures();
    
    // Uncomment the lines below to run additional examples:
    
    // await sendBatchMessages();
    
    // Example: Monitor a specific message (replace with actual message ID)
    // await monitorDelivery('your-message-id-here');
}

// Start the demo
runDemo().catch(console.error);

// Export functions for use in other files
module.exports = {
    demonstrateAllFeatures,
    sendBatchMessages,
    monitorDelivery
};