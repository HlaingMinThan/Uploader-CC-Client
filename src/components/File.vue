<template>
  <div class="border-b-2 border-gray-100 my-3 p-3 flex justify-between">
    <h3 class="text-sm font-normal -ml-3">{{file.name}}</h3>
    <div class="space-x-5 -mr-3">
        <a href="" class="text-indigo-500">Get Sharable Link</a>
        <a href="#" @click="deleteFile" class="text-pink-500">Delete</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props : {
        file : {
            required : true,
            type : Object
        }
    },
    methods: {
      ...mapActions({
        'DELETE_FILE' : 'files/DELETE_FILE'
      }),
      async deleteFile(){
        if(window.confirm('are you sure ?')) {
          await this.DELETE_FILE(this.file.uuid);
        }
      }
    }
}
</script>