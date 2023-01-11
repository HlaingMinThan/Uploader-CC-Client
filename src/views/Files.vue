<template>
    <div class="p-3 md:p-0">
        <div class="mb-8"> uploader</div>
        <div>
            <h3 class="text-gray-600">Your Files</h3>
            <div class="border-b-2 border-gray-100 my-3"></div>
            <File v-for="file in files" :file="file" :key="file.uuid"/>
        </div>
    </div>
</template>

<script>
import File from '@/components/File.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: { File},
    methods : {
        ...mapActions({
            GET_FILES: 'files/GET_FILES'
        })
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