<template>
    <div class="p-3 md:p-0">
        <div class="mb-8">
            <Uploader @onprocessfile="onprocessfile"/>
        </div>
        <div>
            <h3 class="text-gray-600">Your Files</h3>
            <div class="border-b-2 border-gray-100 my-3"></div>
            <File v-for="file in files" :file="file" :key="file.uuid"/>
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