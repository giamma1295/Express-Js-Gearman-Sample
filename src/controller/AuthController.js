const { validationResult } = require('express-validator');
const AuthValidator = require('../validator/AuthValidator')
const RouterConstants = require('../static/Routes')
const AuthService = require('../service/AuthService')
const ResponseUtility = require('../utils/ResponseUtility')

function authUser(req, res) {
    const errors = validationResult(req);
   
    //check for validation errors
    if (!errors.isEmpty()) {
        return ResponseUtility.sendValidationError(res, errors);
    }
    
    try {
        //Generate Token
        let token = AuthService.authUser(req.body.username, req.body.password)
        //Return Token
        return res.send({token: token})
    } catch (err) {
        return ResponseUtility.sendErrorResponse(err);
    }
    
}

module.exports = (app) => {
    app.post(
        RouterConstants.AUTH,
        AuthValidator.validate(),
        authUser
    );
  };