export default {
    setToken(state, payload){
        state.userState.token = payload.token;
    }
}