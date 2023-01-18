<template>
    <form action="" @submit.prevent="swapPlan" class="p-4 md:p-0">
        <div class="mt-10">
            <div v-for="plan in plans" :key="plan.id" class="flex">
                <input type="radio" name="" :id="`plan_${plan.slug}`" class="mr-3" v-model="form.plan" :value="plan.slug" v-if="plan.can_downgrade">
                <label :for="`plan_${plan.slug}`" class="flex-grow">
                    <Plan :plan="plan"/>
                </label>
            </div>
        </div>
        <div class="flex justify-center">
            <button type="submit" class="bg-indigo-500 px-6 py-2 text-white rounded-lg flex items-center w-2/4" :class="{'opacity-50':loading}">
                <svg v-if="loading"  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-md text-center w-full">Swap Now</p>
            </button>
        </div>
    </form>
</template>

<script>
import axios from 'axios'
import Plan from '@/components/Plan.vue';
import { mapGetters } from 'vuex';

export default {
    components: {Plan},
    data(){
        return{
                plans: [],
                form : {
                    plan : null
                }
        }
    },
    computed : {
        ...mapGetters({
        'user' : 'auth/user'
        })
    },
    methods : {
        swapPlan(){
            console.log('swap')
        }
    },
    async mounted() {
        const res = await axios.get('/api/plans');
        this.plans = res.data.data;
        this.form.plan = this.user.plan.slug; // select user current plan
    }
}
</script>

<style>

</style>