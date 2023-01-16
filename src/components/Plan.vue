<template>
  <router-link :to="{name : 'Checkout', query : {plan : plan.slug}}" class="flex justify-between border-2 border-gray-200 py-4 px-4 rounded-xl my-3" v-if="!plan.free">
        <h3 class="text-lg">{{$ucFirst(plan.name)}} - {{formattedStorage}}</h3>
        <div class="text-xl text-indigo-500 font-bold">
            {{plan.price/100}} USD
        </div>
    </router-link>
</template>

<script>
import { filesize } from 'filesize';

export default {
    props : {
        plan : {
            required : true,
            type : Object
        }
    },
    inject:['$ucFirst'],
    computed:{
        formattedStorage(){
            return filesize(this.plan.storage);
        }
    },
}
</script>

<style>

</style>