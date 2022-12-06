require('dotenv').config()

module.exports = {
    appKey: process.env.APP_KEY,
    appUrl: process.env.APP_URL,
    appPort: process.env.APP_PORT,
    mongoUri:process.env.MONGO_URI,
    accountId:process.env.TWILIO_ACCOUNT_SID,
    authId:process.env.TWILIO_AUTH_TOKEN,
    serviceId:process.env.TWILIO_SERVICE_ID
    

} 