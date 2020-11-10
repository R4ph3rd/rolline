const fetch = require('node-fetch');
const btoa = require('btoa');

module.exports = [
  {
    method: "GET",
    path: "/auth/discord",
    handler: async (request, h) => {
      return h.redirect('https://discordapp.com/api/oauth2/authorize?client_id=774651484314533888&scope=identify&response_type=code');
    },
  },
  {
    method: "GET",
    path: "/auth/callback",
    handler: async (request, h) => {
      if (!request.query.code) throw new Error('NoCodeProvided');
      const code = request.query.code;
      const creds = btoa(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`);
      const response = await fetch(`https://discord.com/api/oauth2/authorize?client_id=774651484314533888&redirect_uri=http%3A%2F%2Flocalhost%3A5051%2Fauth%2Fcallback&response_type=code&scope=identify%20messages.read%20rpc?grant_type=authorization_code&code=${code}`,
      
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${creds}`,
          },
        }).then (rep => console.log("rep : ", rep));
      const json = await response.json();
      console.log("json :",json)
      return h.redirect(`/?token=${json.access_token}`);
    },
  }
]