<template>
  <a href="#" @click="getSharableLink" class="text-indigo-500">Get Sharable Link</a>
</template>

<script>
import axios from 'axios'
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  props : {
    file : {
      type : Object,
      required : true
    }
  },
  inject: ['$toast'],
  methods: {
    copyToClipboard(value) {
      if(navigator && navigator.clipboard) {
        navigator.clipboard.writeText(value);
        console.log(toast);
         toast.info("copied to clipboard.ready to share!");
      }else {
        alert('browser not supportted');
      }
    },
    async getSharableLink(){
      const res = await axios.post(`/api/files/${this.file.uuid}/links`);
      this.copyToClipboard(res.data.data.url)
    }
  }
}
</script>

<style>

</style>