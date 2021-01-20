const WebhookRepository = require('../repository/WebhookRepository')

function getWebhookUrl(username){

    const webhookInfo = WebhookRepository.getWebhookByUsername(username)

    //No webhookUrl found for the user
    if(!webhookInfo){
        const err = new Error()
        err.status = 404
        err.responseMsg = "No webhookUrl set by the user"
        throw err
    }

    return webhookInfo.url
}

function setWebhookUrl(username, url){
    WebhookRepository.setWebook(username, url)
}

module.exports = {
    getWebhookUrl,
    setWebhookUrl
}
