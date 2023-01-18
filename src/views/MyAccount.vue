<template>
  <div class="mt-6">
    <h3 class="text-gray-600">Your Account
        <router-link class="bg-indigo-500 px-2 py-1 text-sm text-white rounded-lg ml-3" to="/swap-plan">Swap Plan</router-link>
    </h3>
    <div class="border-b-2 border-gray-100 my-3"></div>
    <p>You are on {{user.plan.name}} plan.<template v-if="user.ends_at">Your Subscription will be ends on {{user.ends_at}}.</template></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed : {
        ...mapGetters({
        'user' : 'auth/user'
    })}
}
</script>

<style>

</style>