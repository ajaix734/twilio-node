'use strict'

require('dotenv').config()
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const twilio_phone = '(415) 539-0272'

exports.sendService = async function (data) {
    try {
        let lookupData = await client.lookups
                                .phoneNumbers(data.phone)
                                .fetch({type: ['carrier']})
        // 404 = INDIA, 525 = Singapore
        if(lookupData.carrier.mobile_country_code === '404' || '525'){
            let response = await client.messages
                                       .create({
                                            body: data.message,
                                            from: twilio_phone,
                                            to: data.phone
                                            })
            return response.sid
        }
    } catch (error) {
        delete error.moreInfo
        if(error.code === 21608){
            error.errorMsg = error.message
        }
        else if(error.code === 20404){
            error.errorMsg = 'Invalid Phone Number'
        }
        throw error
    }
}

exports.statusService = async function (data) {
    try {
        let sentList = await client.messages.list({limit: 20})
        let foundSid = sentList.filter(list => data.sid === list.sid).pop()
        if(foundSid){
            let responseObj = {
                status: foundSid.status,
                to: foundSid.to,
                from: foundSid.from
            }
            return responseObj
        }
        else{
            throw new Error('Invalid SID')
        }
    } catch (error) {
        error.errorMsg = error.message
       throw error
    }
}