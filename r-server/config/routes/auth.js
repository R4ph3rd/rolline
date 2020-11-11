const fetch = require('node-fetch');
const btoa = require('btoa');

module.exports = [
  {
    method: "GET",
    path: "/auth/discord",
    handler: async (request, h) => {
      const data = {
        client_id: process.env.DISCORD_CLIENT_ID,
        redirect_uri: 'http://localhost:5051/auth/callback',
        scope: 'identify', //%20[scope]%20[another_scope]
      }
      return h.redirect(`https://discord.com/api/oauth2/authorize?client_id=${data.client_id}&redirect_uri=${data.redirect_uri}&response_type=code&scope=${data.scope}`);
    },
  },
  {
    method: "GET",
    path: "/auth/callback",
    handler: async (request, h) => {
      if (!request.query.code) throw new Error('NoCodeProvided');
      const code = request.query.code;
      const creds = btoa(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`);
      const data = {
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:5051/auth/callback',
        code: code,
        scope: 'identify', //%20[scope]%20[another_scope]
      }
      const response = await fetch(`https://discord.com/api/oauth2/token`,  
        {
          method: 'POST',
          body: new URLSearchParams(data),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then (async rep => {
          /* console.log("rep : ", rep); 
          console.log("rep json: ", json);  */
          return await rep.json();
        });
      console.log('my token !!!' , response)
      // h.redirect(`/?token=${json.access_token})`
      return code;
    },
  }
]