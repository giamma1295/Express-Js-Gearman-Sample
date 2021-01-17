const userSample = {
    username: 'john',
    password: 'doe'
}

function getUserByUsername(username){
    //Here we shold be called the db in order to retrieve user details
    //In this example, cuz the username-password tuple is given
    //and no requirement about user CRUD operation, we will not access a Datasource 
    if(username === userSample.username) return userSample
    return null
}

module.exports = {
    getUserByUsername
}

