<template>
    <form @submit.prevent="login" class="rounded-lg  p-8 md:w-8/12 mx-auto mt-10">
      <h1 class="text-xl text-indigo-400 text-center my-3 font-bold">Login & Enjoy</h1>
      <div class="mb-3">
        <label for="email" class="inline-block mb-4 text-sm">Email Address</label>
        <input type="email" class="border border-gray-200 w-full h-10 px-3 rounded-md" v-model="form.email" :class="{'border-2 border-red-400' : errors && errors.email}">
        <p class="text-sm text-red-500 my-2" v-if="errors && errors.email">{{errors.email}}</p>
      </div>
      <div class="mb-3">
        <label for="password" class="inline-block mb-4 text-sm">Password</label>
        <input type="password" class="border border-gray-200 w-full h-10 px-3 rounded-md" v-model="form.password" :class="{'border-2 border-red-400' : errors && errors.email}">
        <p class="text-sm text-red-500 my-2" v-if="errors && errors.password">{{errors.password}}</p>
      </div>
      <Button  type="submit"  :loading="loading" :disabled="loading" >Login</Button>
    </form>
      <p class="text-gray-400 text-center mt-1">Not A Member ? <a href="#" @click="redirectToCreateAccount" class="text-indigo-500 underline">Create an Account</a></p>
</template>

<script>
import { mapActions } from 'vuex'
import Button from '@/components/Button.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
  components : { Button },
  data(){
    return{
      form:{
        email:'',
        password: ''
      },
      loading : false,
      errors : null
    }
  },
  methods : {
    ...mapActions({'LOGIN':'auth/LOGIN'}),
    async login(){
      try {
        this.loading = true;
        await this.LOGIN(this.form);
        this.loading = false;
        toast.info('Welcome Back');
        this.$router.replace({name:'Home'})
      }catch (e) {
        if(e.response.status === 422 ) {
          console.log()
          this.errors ={
            email : e.response.data.errors.email[0],
            password : e.response.data.errors.password[0]
          }
        }
        this.loading = false;
      }
    }
  }
}
</script>

<style>

</style>