<template>
    <span class="bg-gray-200 p-1  rounded-lg text-sm">Usage - {{formattedUsage}}/ {{totalFormatForUser}} ({{percentage}}%)</span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {filesize} from 'filesize';

export default {
    computed: {
        ...mapGetters({
            user : "auth/user",
            usage : "usage/usage"
        }),
        formattedUsage(){
            return filesize(this.usage);
        },
        totalFormatForUser() {
            return filesize(this.user.plan.storage);
        },
        percentage() {
            return ((this.usage / this.user.plan.storage) * 100).toFixed(2);
        }
    },
    methods: {
        ...mapActions({
            GET_USER_USAGE : 'usage/GET_USER_USAGE'
        }),
    },
    mounted(){
        this.GET_USER_USAGE()
    }
}
</script>

<style>

</style>