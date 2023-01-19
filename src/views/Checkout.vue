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
      <Button  type="submit" :loading="loading" :disabled="loading" >Pay Now</Button>
    </form>
</template>

<script>
import axios from 'axios';
import Button from '@/components/Button.vue';
import { mapActions } from 'vuex'
import { useToast } from 'vue-toastification';

// eslint-disable-next-line no-undef
let stripe = Stripe(process.env.VUE_APP_STRIPE_KEY);
let elements = stripe.elements();
let card = elements.create('card');


const toast = useToast();

export default {
  props : {
    plan : {
      required : true,
      type : String
    }
  },
  components : { Button },
  data(){
    return{
      loading : false,
      err_message : '',
      form:{
        name:'',
      }
    }
  },
  inject:['$ucFirst'],
  methods : {
    ...mapActions({
      'GET_CURRENT_USER':'auth/GET_CURRENT_USER'
      }),
    async submit(){
      try { 
        this.err_message = '';
        this.loading = true;
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
          this.loading = false;
        }else {
          await this.createSubscription(setupIntent.payment_method)
        }
      }catch(e) {
        this.loading = false;
      }
    },
    async createSubscription(paymentMethodId) {      
      await axios.post('/api/subscriptions/store',{
        plan : this.plan,
        paymentMethodId
      });
      await this.GET_CURRENT_USER();
      this.loading = false;
      toast.info('Enjoy.You are on '+this.plan+' plan.');
      this.$router.replace({name : 'MyAccount'})
    }
  },
  mounted(){
    card.mount(this.$refs.card)
  }
}
</script>

<style>

</style>