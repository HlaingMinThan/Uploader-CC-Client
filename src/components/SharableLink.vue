<template>
  <a href="#" @click="getSharableLink" class="text-indigo-500">Get Sharable Link</a>
</template>

<script>
import axios from 'axios'
export default {
  props : {
    file : {
      type : Object,
      required : true
    }
  },
  methods: {
    copyToClipboard(value) {
      if(navigator && navigator.clipboard) {
        navigator.clipboard.writeText(value);
        console.log('copied')
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