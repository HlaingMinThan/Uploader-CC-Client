<template>
    <span class="bg-gray-200 p-2  rounded-lg text-sm">Usage - {{usage}}/5MB (10%)</span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            usage : "usage/usage"
        })
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