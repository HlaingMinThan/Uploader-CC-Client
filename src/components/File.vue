<template>
  <div class="border-b-2 border-gray-100 my-3 p-3 flex justify-between">
    <h3 class="text-sm font-normal -ml-3">{{file.name}}</h3>
    <div class="space-x-5 -mr-3">
        <SharableLink :file="file"/>
        <a href="#" @click="deleteFile" class="text-pink-500">Delete</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import SharableLink from '@/components/SharableLink.vue';

export default {
    props : {
        file : {
            required : true,
            type : Object
        }
    },
    components: {
      SharableLink
    },
    methods: {
      ...mapActions({
        'DELETE_FILE' : 'files/DELETE_FILE'
      }),
      ...mapMutations({
        'DECREMENT_USAGE' : 'usage/DECREMENT_USAGE'
      }),
      async deleteFile(){
        if(window.confirm('are you sure ?')) {
          await this.DELETE_FILE(this.file.uuid);
          this.DECREMENT_USAGE(this.file.size)
        }
      }
    }
}
</script>