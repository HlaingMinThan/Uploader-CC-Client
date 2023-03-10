import axios from 'axios';

export default  {
    namespaced :true,
    state : {
        authenticated : false,
        user : null,
    },
    mutations : {
        UPDATE_AUTHENTICATED(state,value) {
            state.authenticated = value;
        },
        SET_USER(state,value) {
            state.user = value;
        }
    },
    getters : {
        authenticated : (state) => state.authenticated,
        user : (state) => state.user
    },
    actions : {
        async LOGIN({dispatch} , credentials){
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/api/login',credentials);
            return dispatch('GET_CURRENT_USER');
        },
        async GET_CURRENT_USER({commit}){
            try {
                let response = await axios.get('/api/user');
                //authenticated
                commit('UPDATE_AUTHENTICATED',true);
                commit('SET_USER',response.data.data);
            } catch(e) {
                //unauthenticated
                commit('UPDATE_AUTHENTICATED',false);
                commit('SET_USER',null);
            }
        },
        async LOGOUT({dispatch}) {
            try {
                await axios.post('/api/logout');
                return dispatch('GET_CURRENT_USER');//be sure to check user logout and update the state
            } catch(e) {
                console.log('error getting on logout',e);
            }
        }
    }
}