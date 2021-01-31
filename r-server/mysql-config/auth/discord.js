module.exports = {
    authorize : () => {
        //https://discord.com/api/oauth2/authorize
        // https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}
        // https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code
    },
    getToken : () => {
        //https://discord.com/api/oauth2/token
    },
    revoke: () => {
        // https://discord.com/api/oauth2/token/revoke
    }
}

// API DOC
// https://discord.com/developers/docs/topics/oauth2
// https://discordjs.guide/oauth2/#oauth2-flows