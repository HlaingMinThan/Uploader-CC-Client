<template>
    <form @submit.prevent="submit" class="rounded-lg mx-auto mt-10">
      <h1 class="text-xl text-indigo-400 text-center  font-bold">Ready to Subscribe to {{$ucFirst(plan)}} plan?</h1>
      <div class="mb-3">
        <label for="name" class="inline-block mb-4 text-sm">Name</label>
        <input type="text" id="name" class="border border-gray-200 w-full h-10 px-3 rounded-md" v-model="form.name">
      </div>
      <div class="mb-3">
        <label for="password" class="inline-block mb-4 text-sm">Card Details</label>
        <div ref="card" class="border-2 border-gray-100 p-3"></div>
      </div>
      <p v-if="err_message" class="text-red-500 text-sm my-3"> {{err_message}}</p>
      <button class="bg-indigo-500 px-6 py-2 text-white rounded-lg">Pay Now</button>
    </form>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex'

// eslint-disable-next-line no-undef
let stripe = Stripe(process.env.VUE_APP_STRIPE_KEY);
let elements = stripe.elements();
let card = elements.create('card');


export default {
  props : {
    plan : {
      required : true,
      type : String
    }
  },
  data(){
    return{
      err_message : '',
      form:{
        name:'',
      }
    }
  },
  inject:['$ucFirst'],
  methods : {
    ...mapActions({'LOGIN':'auth/LOGIN'}),
    async login(){
      await this.LOGIN(this.form);
      this.$router.replace({name:'Home'})
    },
    async submit(){
      let res = await axios.get('/api/subscriptions/intent');
      let { client_secret } = res.data;
      let { setupIntent , error}= await stripe.confirmCardSetup(client_secret, {
        payment_method: {
          card,
          billing_details: {
            name: this.form.name,
          },
        },
      });

      if(error) {
        this.err_message = error.message;
      }else {
        await this.createSubscription(setupIntent.payment_method)
      }
    },
    async createSubscription(paymentMethodId) {
      await axios.post('/api/subscriptions/store',{
        plan : this.plan,
        paymentMethodId
      });
    }
  },
  mounted(){
    card.mount(this.$refs.card)
  }
}
</script>

<style>

</style>