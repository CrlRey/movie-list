<script setup>
import CardComponent from '@/components/card/CardComponent.vue';
import PaginationComponent from '@/components/pagination/PaginationComponent.vue';
import { useMovies } from '@/stores/movies';
import { computed, ref, watch } from 'vue';

const store = useMovies()

//Call the API when pagination change
const onClickHandler = (page) => {
  if (store.enabled) {
       return store.getMovies(page)
    }
       return store.getTvSeries(page)
};


</script>

<template>
  <div class="flex flex-col items-center justify-items-center bg-background space-y-8">
    <h2 class="text-2xl font-bold uppercase justify-center" :class="[store.film.length > 0 ? 'mt-10' : 'mt-10']">
      {{ store.film.length > 0 ? 'Search store' : 'Search Anyway' }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">
      <!-- Card -->
      <CardComponent v-for="movie in store.film" :movie="movie" :key="movie.id" :is-favorite="false"/>
    </div>

    <!-- Tv -->
    
    <div class="flex space-x-1 pb-10 max-sm:px-4 max-sm:mx-auto" v-if="store.film.length > 0">

      <!-- Awsome -->
      <vue-awesome-paginate 
        :total-items="store.nameList.total_pages" v-model="store.currentPage" :max-pages-shown="3" :items-per-page="1" :show-breakpoint-buttons="false" @click="onClickHandler" :show-ending-buttons="true" 
      />
    </div>
  </div>

</template>

<style>
  .pagination-container {
    display: flex;

    column-gap: 10px;
  }

  .paginate-buttons {
    height: 40px;

    width: 40px;

    border-radius: 20px;

    cursor: pointer;

    background-color: rgb(242, 242, 242);

    border: 1px solid rgb(217, 217, 217);

    color: black;
  }

  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }

  .active-page {
    background-color: #3498db;

    border: 1px solid #3498db;

    color: white;
  }

  .active-page:hover {
    background-color: #2988c8;
  }
</style>
