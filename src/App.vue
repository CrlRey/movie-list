<script setup>
import HeaderComponent from './components/header/HeaderComponent.vue';
import SearchComponent from './components/search/SearchComponent.vue';
import { RouterView } from 'vue-router';

</script>

<template>


  <div class="relative md:h-2/3 bg-cover bg-center hero-img">
    <div class="absolute inset-0 bg-black opacity-90"></div>
    <div class="relative z-0">
      <HeaderComponent />
    </div>



    <div class="mx-auto container w-full">
      <div class="relative z-10 flex items-center h-full">
        <!-- Busacdor -->
        <SearchComponent />
      </div>
    </div>
  </div>
  <RouterView />
</template>

<style>
.hero-img {
  background-image: url('assets/img/hero-img.jpg');
}
</style>