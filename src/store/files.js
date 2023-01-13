import axios from 'axios';

export default {
    namespaced: true,
    state : {
        files : []
    },
    getters:{
        files : (state) => state.files
    },
    mutations : {
        SET_FILES(state,value) {
            state.files = value;
        },
        ADD_FILE(state,file) {
            state.files = [file,...state.files];
        }
    },
    actions : {
        async GET_FILES({commit}) {
            try {
                let res = await axios.get('/api/files');
                commit('SET_FILES',res.data.data)
            }catch(e) {
                console.log('getting files got error',e);
            }
        }
    }
}