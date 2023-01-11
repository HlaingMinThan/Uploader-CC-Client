<template>
  <div class="w-full md:w-8/12 lg:w-6/12 mx-auto mt-6 md:mt-20">
  <nav class="flex justify-between items-center flex-wrap md:flex-no-wrap -mx-3 -mt-3">
    <ul class="flex items-center">
      <li><router-link to="/" class="text-sm inline-block  p-3 text-gray-800">Home</router-link></li>
      <li><router-link to="" class="text-sm inline-block  p-3 text-gray-800">Your Files</router-link></li>
    </ul>
    <ul class="flex items-center">
      <li><router-link to="/sign-in" class="text-sm inline-block  p-3 text-gray-800">Sign In</router-link></li>
      <li><router-link to="" class="text-sm inline-block  p-3 text-gray-800">Create Account</router-link></li>
    </ul>
  </nav>
  <router-view/>
  </div>
</template>