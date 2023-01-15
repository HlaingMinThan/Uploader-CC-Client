import axios from 'axios';

export default {
    namespaced: true,
    state : {
        usage : 0
    },
    getters:{
        usage : (state) => state.usage
    },
    mutations : {
        SET_USAGE(state,usage) {
            state.usage = usage
        },
        INCREMENT_USAGE(state,usage) {
            state.usage +=  usage
        },
        DECREMENT_USAGE(state,usage) {
            state.usage -=  usage
        },
    },
    actions : {
        async GET_USER_USAGE({commit}) {
            try {
                let res = await axios.get('/api/user/usage');
                console.log(res)
                commit('SET_USAGE',res.data.data)
            }catch(e) {
                console.log('getting files got error',e);
            }
        },
    }
}