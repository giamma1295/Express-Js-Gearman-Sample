# Sample Express Js, Gearman Worker, Backend
 
 backend => contains a node.js backend implemented using express.js
 
 gearman-worker => contains a basic node.js gearman work having only one job (encode), that encode input data in base64
 
## Backend Api
1. __POST /auth__(login): 
 
  Input json
  
        {
            "username":<username>, 
            "password": <password>
        }
 
  Result json on succes
  
        {
            "token":<jwt-token>
        }
        
2. __POST /webhook__(set webhook url for the user): 

    Header Require jwt-token returned by the /auth api
    
    Input json
  
        {
            "webhookUrl":<webhookUrl>
        }
 
     Result json on succes
  
        {
            "message":"WebhookUrl successfully set"
        }
        
3. __POST /encode__(request string encode):  

    Header Require jwt-token returned by the /auth api
    
    Input json
  
        {
            "toEncode":<webhookUrl>
        }
 
     Result json on succes
  
        {
            "message":"Request accepted, webhook will be called providing the process result"
        }
 
    
 
