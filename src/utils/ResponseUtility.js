
function sendErrorResponse(res, err){
    console.log(err)
    //Set HTTP status code, default 500
    res.status(err.status || 500)

    //Set response message if any was set
    if(err && err.responseMsg) return res.send({message: err.responseMsg})

    return res.send()
}

function sendSuccessResponse(res, message, status){
    res.status(status || 200)

    if(message) return res.send({message: message})

    return res.send()
}

function sendValidationError(res, errors){
    return res.status(402).send(errors);
}


module.exports = {
    sendErrorResponse,
    sendSuccessResponse,
    sendValidationError
}