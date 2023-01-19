<template>
  <div class="rounded-lg p-12 bg-gray-200 text-center mt-8">
      <h3 class="text-xl font-medium text-gray-700 mb-3">Ready to Download File 🥳</h3>
      <Button class="w-full mt-10"  @click="download" :loading="loading" :disabled="loading" >Download Now</Button>
    </div>
</template>

<script>
import Button from '@/components/Button.vue';

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
    components : { Button },
    methods : {
        download(){
            console.log('hit')
        }
    },
}
</script>

<style>

</style>