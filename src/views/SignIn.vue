<template>
  <h1>Sign in</h1>

  <form @submit.prevent="login">
    <button> Submit </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods : {
    ...mapActions({'LOGIN':'auth/LOGIN'}),
    login(){
      this.LOGIN({email : 'hmt@gmail.com',password:'123456'});
    }
  }
}
</script>

<style>

</style>