<template>
  <div class="w-full md:w-8/12 lg:w-6/12 mx-auto mt-6 md:mt-20">
  <Navbar></Navbar>
  <router-view/>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar';

export default {
  components : { Navbar }
}
</script>