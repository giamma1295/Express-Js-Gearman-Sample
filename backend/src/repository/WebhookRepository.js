const fs = require('fs');

//Here we shold be called the db in order to execute CRUD operation on real stored data
//For this example we will use a json file stored locally

function getWebhookByUsername(username){
    const filename = getFilename(username)

    try {
        let rawdata = fs.readFileSync(filename);
        return JSON.parse(rawdata)
    } catch (error) {
        return null
    }
}

function setWebook(username, url){
    const filename = getFilename(username)

    const webhookDetails = {
        url: url
    }

    fs.writeFile(filename, JSON.stringify(webhookDetails), (err) => {
        if (err) 
            console.log("error writing")
        console.log('Data written to file');
    });

}

function getFilename(username){
    return 'webhook_' + username + '.json'
}


module.exports = {
    getWebhookByUsername,
    setWebook
}