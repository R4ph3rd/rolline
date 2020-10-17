export default {
    initializeUserState(state){
        if(localStorage.getItem('token')){
            state.userState.token = localStorage.getItem('token');
        }
    },
    setToken(state, payload){
        state.userState.token = payload.token;
        localStorage.setItem('token', payload.token);
    },
    clearLocalStorage(state, payload){
        localStorage.clear();
        state.userState = {
            token: ''
        };
        console.warn('Local storage cleaned !', state.userState)
    }
    /*
    setToken(state, payload){
        localStorage.setItem('token', payload.token);
        state.userState.token = payload.token;
        console.log('set token : ', state.userState.token, payload.token)
    },
    clearLocalStorage(state, payload){
        localStorage.clear();
        state.userState = {};
        console.warn('Local storage cleaned !')
    }
}*/
}