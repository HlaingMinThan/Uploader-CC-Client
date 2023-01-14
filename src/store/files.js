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
        },
        DELETE_FILE(state,uuid) {
            state.files = state.files.filter(file => file.uuid !== uuid);
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
        },
        async DELETE_FILE({commit},uuid) {
            commit('DELETE_FILE',uuid)
            await axios.delete(`/api/files/${uuid}`);
        }
    }
}