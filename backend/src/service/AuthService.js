const JWTMiddleware = require('../security/JWTmiddleware')
const UserRepository = require('../repository/UserRepository')

function authUser(username, password){
    
    //Fetch user details
    let user = UserRepository.getUserByUsername(username)

    // ser Not Found/ Password Mismatch -> throw
    // For security reason shold be send to the client 
    // "User Not Found" even the user exist in case of password mismatch
    
    if(!user || user.password !== password){
        const err = new Error()
        err.status = 403
        err.responseMsg = "User Not Found"
        throw err
    }


    //OK -> Create and return jwt token
    return JWTMiddleware.generateToken(username);

}

module.exports = {
    authUser
}