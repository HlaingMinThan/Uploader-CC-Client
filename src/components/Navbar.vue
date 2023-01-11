<template>
  <nav class="flex justify-between items-center flex-wrap md:flex-no-wrap -mx-3 -mt-3">
    <ul class="flex items-center">
      <li><router-link to="/" class="text-sm inline-block  p-3 text-gray-800">Home</router-link></li>
      <li><router-link :to="{name : 'Files' }" class="text-sm inline-block  p-3 text-gray-800">Your Files</router-link></li>
    </ul>
    <ul class="flex items-center">
      <template v-if="authenticated">
        <li><router-link to="/sign-in" class="text-sm inline-block  p-3 text-gray-800">{{user.name}}</router-link></li>
        <li><a href="#" @click.prevent="logout" class="text-sm inline-block  p-3 text-gray-800">Logout</a></li>
      </template>
      <template v-else>
        <li><router-link to="/sign-in" class="text-sm inline-block  p-3 text-gray-800">Sign In</router-link></li>
        <li><router-link to="" class="text-sm inline-block  p-3 text-gray-800">Create Account</router-link></li>
      </template>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      'authenticated' : 'auth/authenticated',
      'user' : 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      'LOGOUT' : 'auth/LOGOUT'
    }),
    async logout(){
      await this.LOGOUT();
      this.$router.replace('/')
    }
  }
}
</script>

<style>

</style>