<script setup>
import HeaderComponent from './components/header/HeaderComponent.vue';
import ModalComponent from './components/modal/ModalComponent.vue';
import NotificationComponent from './components/notification/NotificationComponent.vue';
import SaveFilter from './components/SaveFilter/SaveFilter.vue';
import SearchComponent from './components/search/SearchComponent.vue';
import { RouterView } from 'vue-router';

</script>

<template>


  <div class="relative md:h-2/3 bg-cover bg-center hero-img overflow-hidden">
    <div class="absolute inset-0 bg-black opacity-90"></div>
    <div class="relative z-0">
      <HeaderComponent />
    </div>
   
    <div class="mx-auto container w-full pb-10">
      <div class="flex items-center h-full py-5">
        <!-- Busacdor -->
        <SearchComponent />
        <!-- SaveFilter -->
        <SaveFilter />
      </div>
    </div>
  </div>
  <RouterView />
  <ModalComponent />
  <NotificationComponent />
</template>

<style>
.hero-img {
  background-image: url('assets/img/hero-img.jpg');
}
</style>