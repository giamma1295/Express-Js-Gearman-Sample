const { validationResult } = require('express-validator');
const WebhookValidator = require('../validator/WebhookValidator')
const RouterConstants = require('../static/Routes')
const JWTMiddleware = require('../security/JWTmiddleware')
const ResponseUtility = require('../utils/ResponseUtility')
const WebhookService = require('../service/WebhookService')


function setUrl(req, res) {
    const validationErr = validationResult(req);

    //check for validation errors
    if (!validationErr.isEmpty()) {
        return ResponseUtility.sendValidationError(res, validationErr);
    }

    //Fetch webhook url from repository for this user
    WebhookService.setWebhookUrl(req.tokenData.username, req.body.webhookUrl)

    return ResponseUtility.sendSuccessResponse(res, 'WebhookUrl successfully set')

}

module.exports = (app) => {
    app.post(
        RouterConstants.WEBHOOK,
        JWTMiddleware.isAuthenticated,
        WebhookValidator.validate(),
        setUrl
    );
  };