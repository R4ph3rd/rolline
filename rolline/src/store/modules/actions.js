import axios from 'axios'
require('dotenv').config();

const urls = {
    user : `http://localhost:5051/user`,
    userConnect: `http://localhost:5051/user_connect`,
    game: `http://localhost:5051/game`,
    file: `http://localhost:5051/upload_file`,
}


export default{
    connect(context, payload){
        return axios.post(
            urls.userConnect,{
                mail: payload.mail,
                password: payload.password
            }
        )
        .then( response => {
            console.log(response)
            if (response.data.statusCode == 200){
                context.commit('setToken', response.data)
            }
            return response.data;
        })
        .catch( (err) => {
            console.warn('Couldn"t connect to the server : ', err)
        })
    },
    register(context, payload){
        return axios.post(urls.user, payload).then( (rep) => {
            if (rep.data.statusCode == 203){ // means user is registered
                return rep.data ;
            }
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
    async getEnrolledGames(context, payload){
        return await axios(urls.user + '/1').then( async (response) => {
            response.data.games_id = await Promise.all(response.data.games_id.map( async (game_id) => {
                let game = await axios(urls.game + '/' + game_id);
                return game.data
            }))
            return response.data.games_id ;
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
    },
    clearLocalStorage(context, payload){
        context.commit('clearLocalStorage');
    },
    /*setToken(context, payload){
        context.commit('setToken', response.data)
    },
    clearLocalStorage(context, payload){
        context.commit('clearLocalStorage');
    },
    */
    createGame(context, payload){
        console.log(payload)
        axios.post(urls.game, payload)
            .then (response => {
                console.log('response', response)
            })
            .catch( (err) => {
                console.warn('Couldn"t connect to the server : ', err)
            })
    },
    uploadFile(context, payload){
        console.log(payload)
        axios.post(urls.file, payload)
        .then(response => {
            console.log(response)
        })
    }
}