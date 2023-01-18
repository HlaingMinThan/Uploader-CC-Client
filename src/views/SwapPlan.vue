<template>
    <form action="" @submit.prevent="swapPlan" class="p-4 md:p-0" v-if="plans.length">
        <div class="mt-10">
            <div v-for="plan in plans" :key="plan.id" class="flex">
                <input type="radio" name="" :id="`plan_${plan.slug}`" class="mr-3" v-model="form.plan" :value="plan.slug" v-if="plan.can_swap">
                <label :for="`plan_${plan.slug}`" class="flex-grow">
                    <Plan :plan="plan"/>
                </label>
            </div>
        </div>
        <div class="flex justify-center">
            <Button  type="submit" class="w-2/4" :loading="loading" :disabled="loading"  v-if="showSwapBtn">Swap</Button>
            <p v-else class="text-red-500 my-4 text-sm">You are using too much storage. You can't swap plan right now.</p>
        </div>
    </form>
</template>

<script>
import axios from 'axios'
import Plan from '@/components/Plan.vue';
import Button from '@/components/Button.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: { Plan, Button },
    data(){
        return{
                plans: [],
                form : {
                    plan : null
                },
                loading:false
        }
    },
    computed : {
        ...mapGetters({
        'user' : 'auth/user'
        }),
        showSwapBtn(){
            return this.plans.filter(plan => plan.can_swap).length;
        }
    },
    methods : {
        ...mapActions({
        'GET_CURRENT_USER':'auth/GET_CURRENT_USER'
        }),
        async swapPlan(){
            if(!this.form.plan) return;
            this.loading=true;
            await axios.patch('/api/subscriptions/swap',this.form);
            await this.GET_CURRENT_USER();
            this.loading=false;
            this.$router.replace({name : "MyAccount"});
        }
    },
    async mounted() {
        const res = await axios.get('/api/plans');
        this.plans = res.data.data;
    }
}
</script>

<style>

</style>