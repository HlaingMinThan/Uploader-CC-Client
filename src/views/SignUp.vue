<template>
    <form @submit.prevent="register" class="rounded-lg  p-8 md:w-8/12 mx-auto mt-10">
      <h1 class="text-xl text-indigo-400 text-center my-3 font-bold">Create Account</h1>
      <div class="mb-3">
        <label for="name" class="inline-block mb-4 text-sm">Name</label>
        <input type="text" class="border border-gray-200 w-full h-10 px-3 rounded-md" v-model="form.name" :class="{'border-2 border-red-400' : errors && errors.name}">
        <p class="text-sm text-red-500 my-2" v-if="errors && errors.name">{{errors.name}}</p>
      </div>
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
      <div class="mb-3">
        <label for="password" class="inline-block mb-4 text-sm">Password Confirmation</label>
        <input type="password" class="border border-gray-200 w-full h-10 px-3 rounded-md" v-model="form.password_confirmation" :class="{'border-2 border-red-400' : errors && errors.email}">
        <p class="text-sm text-red-500 my-2" v-if="errors && errors.password_confirmation">{{errors.password_confirmation}}</p>
      </div>
      <Button  type="submit"  :loading="loading" :disabled="loading" >Create Account</Button>
    </form>
      <p class="text-gray-400 text-center mt-1">Already have an account ? <router-link to="/sign-in"  class="text-indigo-500 underline">Login</router-link></p>
</template>

<script>
import { mapActions } from 'vuex'
import Button from '@/components/Button.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

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
    async register(){
      try {
        this.loading = true;
        await axios.post('/api/register',this.form);
        await this.LOGIN({
            email: this.form.email,
            password: this.form.password
        });
        this.loading = false;
        toast.info('Welcome From CC-Uploader');
        this.$router.replace({name:'MyAccount'})
      }catch (e) {
        if(e.response.status === 422 ) {
          this.errors ={
            name : e.response.data.errors.name && e.response.data.errors?.name[0],
            email : e.response.data.errors.email && e.response.data.errors.email[0],
            password : e.response.data.errors.password && e.response.data.errors.password[0]
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