<template>
    <div class="p-3 md:p-0">
        <div v-if="errMessage" class="bg-red-600 p-3 text-sm my-4 rounded-md text-white">
            {{errMessage}}
        </div>
        <div class="mb-8">
            <Uploader @onprocessfile="onprocessfile" @validationError="msg => errMessage = msg"/>
        </div>
        <div>
            <h3 class="text-gray-600">Your Files</h3>
            <div class="border-b-2 border-gray-100 my-3"></div>
            <template v-if="files.length">
                <File v-for="file in files" :file="file" :key="file.uuid" />
            </template>
            <p v-else class="text-gray-500 text-sm">there are no files here right now.</p>
        </div>
    </div>
</template>

<script>
import File from '@/components/File.vue';
import Uploader from '@/components/Uploader';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import axios from 'axios';
export default {
    components: { File,Uploader },
    data(){
        return{
            errMessage : ''
        }
    },
    methods : {
        ...mapActions({
            GET_FILES: 'files/GET_FILES'
        }),
        ...mapMutations({
            ADD_FILE: 'files/ADD_FILE'
        }),
        async onprocessfile(file) {
            let res = await axios.post('/api/files',{
                'name' : file.filename,
                'size' : file.fileSize,
                'path' : file.serverId
            });
            this.ADD_FILE(res.data.data);
        }
    },
    computed:{
        ...mapGetters({
            files: 'files/files'
        })
    },
    mounted(){
        this.GET_FILES()
    }
}
</script>

<style>

</style>