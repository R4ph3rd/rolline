import axios from 'axios'

const urls = {
    user : 'http://localhost:5050/user',
    userConnect: 'http://localhost:5050/user_connect',
    game:'http://localhost:5050/game',
}

export default{
    connect(context, payload){
        return axios.post(urls.userConnect, {
            mail: payload.mail,
            password: payload.password
        })
        .then( response => {
            context.commit('setToken', response.data)
            return response.data;
        })
        .catch( (err) => {
            console.warn('Couldn"t connect to the server : ', err)
        })
    },
    register(context, payload){
        console.log('Registration demand :', payload)
        axios.post(urls.user, {
            mail: payload.mail,
            discord_id: payload.discord_id,
            password: payload.password
        }).then( () => {
            console.warn('Registration sent to DB !')
        })
    },
    getUsers(context, payload){
        return axios(urls.user).then( function(response){
            return response.data ;
        })
        .catch( function(err){
            console.error(err)
        })
    },
    getGames(context, payload){
        return axios(urls.game).then( function(response){
            return response.data ;
        })
        .catch( function(err){
            console.error(err)
        })
    },
    getGame(context, payload){
        return axios(urls.game + '/' + payload).then( function(response){
            return response.data ;
        })
        .catch( function(err){
          console.error(err)
        })
    },
    setToken(context, payload){
        context.payload('setToken', payload);
    }
}