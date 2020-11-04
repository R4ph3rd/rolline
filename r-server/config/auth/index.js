module.exports = {
    validate : async (decoded, request, h) => {

        // do your checks to see if the person is valid
          return { isValid: true };
    }
}