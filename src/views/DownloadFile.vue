<template>
    <div class="rounded-lg p-12 bg-gray-200 text-center mt-8" v-if="file && download_url">
        <h3 class="text-xl font-medium text-gray-700 mb-3">Ready to Download for {{file.name}} 🥳</h3>
        <Button class="w-full mt-10"  @click="download" :loading="loading" :disabled="loading" >Download Now</Button>
    </div>
    <p v-else class="text-sm text-white bg-red-500 p-3 my-3 text-center">Sorry This file is not available anymore. go back to home <router-link to="/" class="underline ">home</router-link></p>
</template>

<script>
import Button from '@/components/Button.vue';
import axios from 'axios';

export default {
    props : {
        uuid : {
            type : String,
            required :true
        },
        token : {
            type : String,
            required :true
        },
    },
    data(){
      return{
            file: null,
            download_url: ''
      }
    },
    components : { Button },
    methods : {
        async getDownloadInfos() {
            let res = await axios.get(`/api/files/${this.uuid}/get-download-link?token=${this.token}`)
            this.file = res.data.data
            this.download_url = res.data.meta.download_url           
        },
        async download(){
            let a = document.createElement('a');
            a.href=this.download_url
            a.download = true;
            a.click();
        }
    },
    async mounted() {
        await this.getDownloadInfos()
    }
}
</script>

<style>

</style>