<template>
    <input type="file" multiple ref="filepond">
</template>

<script>
import * as FilePond from 'filepond';

export default {
    mounted(){
        FilePond.create(this.$refs.filepond)
    }
}
</script>

<style>

</style>