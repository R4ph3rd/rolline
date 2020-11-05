const userQueries = require('../queries/user')
module.exports = {
    validate : async (decoded, request, h) => {

        // do your checks to see if the person is valid
        console.log("decoded", decoded)
        if(decoded.mail){
          if(await userQueries.getUser({mail: decoded.mail})){
            console.log(await userQueries.getUser({mail: decoded.mail}))
            return { isValid: true };
          } else {
            return { isValid: false };
          }
        }
          
    }
}