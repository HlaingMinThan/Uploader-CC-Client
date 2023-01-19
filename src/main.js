import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css';
import axios from 'axios';
import ucFirst from '@/helpers/ucFirst';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

//persist the user state
store.dispatch('auth/GET_CURRENT_USER').then(()=>{
    createApp(App).use(store).use(router)
    .provide('$ucFirst',ucFirst)
    .use(Toast)
    .mount('#app')
})

