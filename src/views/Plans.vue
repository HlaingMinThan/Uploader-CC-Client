<template>
  <div class="mt-10">
    <Plan v-for="plan in plans" :key="plan.id" :plan="plan"/>
  </div>
</template>

<script>
import axios from 'axios'
import Plan from '@/components/Plan.vue';

export default {
    components: {Plan},
    data(){
      return{
            plans: []
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