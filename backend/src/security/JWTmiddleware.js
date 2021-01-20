const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET_KEY

function generateToken(username){
    tokenContent = {
        username: username
    }
    return jwt.sign(tokenContent, secretKey);
}

function isAuthenticated(req, res, next){

    //The token should be on the authorization header in form "BEARER <token>"
    const authorization = req.headers['authorization']

    //No authorization header
    if(!authorization) return res.sendStatus(401)

    //extract BEARER
    const token = authorization.split(" ")[1]
    if(!token) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, tokenData) => {
        //Token is not valid
        if(err) return res.sendStatus(403)

        //Token validated, inject token decripted data into token
        req.tokenData = tokenData
        //call next function in order
        next()
    })
}



module.exports = {
    generateToken,
    isAuthenticated
}