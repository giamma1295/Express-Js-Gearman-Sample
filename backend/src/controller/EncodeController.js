const { validationResult } = require('express-validator');
const EncodeValidator = require('../validator/EncodeValidator')
const RouterConstants = require('../static/Routes')
const JWTMiddleware = require('../security/JWTmiddleware')
const WebhookService = require('../service/WebhookService')
const EncodeService = require('../service/EncodeService')
const ResponseUtility = require('../utils/ResponseUtility')

function encode(req, res) {
    const validationErr = validationResult(req);

    //check for validation errors
    if (!validationErr.isEmpty()) {
        return ResponseUtility.sendValidationError(res, validationErr);
    }

    try {
        //Fetch webhook url from repository for this user
        let webhookUrl = WebhookService.getWebhookUrl(req.tokenData.username)

        // Encode and Send Webhook
        EncodeService.submitEncode(webhookUrl, req.body.toEncode)

    } catch (err) {
        return ResponseUtility.sendErrorResponse(res, err)
    }

    //Request encode to gearman worker(execute Async)
    return ResponseUtility.sendSuccessResponse(res, 'Request accepted, webhook will be called providing the process result',202)

}


module.exports = (app) => {
    app.post(
        RouterConstants.ENCODE,
        JWTMiddleware.isAuthenticated,
        EncodeValidator.validate(),
        encode
    );
  };