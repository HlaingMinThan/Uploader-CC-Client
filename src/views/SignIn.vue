<template>
    <form @submit.prevent="login" class="rounded-lg  p-8 md:w-8/12 mx-auto mt-10">
      <h1 class="text-xl text-indigo-400 text-center my-3 font-bold">Login & Enjoy</h1>
      <div class="mb-3">
        <label for="email" class="inline-block mb-4 text-sm">Email Address</label>
        <input type="email" class="border border-gray-200 w-full h-10 px-3 rounded-md" v-model="form.email">
      </div>
      <div class="mb-3">
        <label for="password" class="inline-block mb-4 text-sm">Password</label>
        <input type="password" class="border border-gray-200 w-full h-10 px-3 rounded-md" v-model="form.password">
      </div>
      <button class="bg-indigo-500 px-6 py-2 text-white rounded-lg">Login</button>
    </form>
      <p class="text-gray-400 text-center mt-1">Not A Member ? <a href="#" @click="redirectToCreateAccount" class="text-indigo-500 underline">Create an Account</a></p>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data(){
    return{
      form:{
        email:'',
        password: ''
      }
    }
  },
  methods : {
    ...mapActions({'LOGIN':'auth/LOGIN'}),
    async login(){
      await this.LOGIN(this.form);
      this.$router.replace({name:'Home'})
    }
  }
}
</script>

<style>

</style>