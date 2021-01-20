const gearman = require('gearman')
const fetch = require('node-fetch');
const GearmanConstants = require('../static/Gearman')
const gearmanServerUrl = process.env.GEARMAN_URL
const gearmanServerPort = process.env.GEARMAN_PORT

async function submitEncode(webhookUrl, toEncode){

    let client = gearman(gearmanServerUrl, gearmanServerPort , {timeout: 3000})
    
    // handle timeout 
    client.on('timeout', function() {
        console.log(`Timeout, cannot process the request...., cannot send result for input ${toEncode} => ${webhookUrl}`)
        client.close()
    })

    //In case of error, we will log them
    client.on('error', function(error) {
        console.log(`Error on encoding gearmanjob, the reason was ${error}, cannot send result for input ${toEncode} => ${webhookUrl}`)
        client.close()
    })

    //In case of success, we will call the Webhook url
    client.on('WORK_COMPLETE', function(job) {
        const result = job.payload.toString()
        sendResult(webhookUrl, result)
        console.log(`Received encode result => ${result}`)
        client.close()
    })

    // connect to the gearman server
    client.connect(function() {
        // submit a the encode job
        client.submitJob(GearmanConstants.ENCODE_BASE64, toEncode)
    })
 
}

function sendResult(webhookUrl, encoded){
    const requestBody = {
        encoded: encoded
    }

    fetch(webhookUrl, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
    }).then(json => console.log(json))
      .catch(err => console.log(`Unable to send worker encode result '${encoded}', ${err}`))
}

module.exports = {
    submitEncode
}

