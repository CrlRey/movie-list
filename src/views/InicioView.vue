<script setup>
import CardComponent from '@/components/card/CardComponent.vue';
import PaginationComponent from '@/components/pagination/PaginationComponent.vue';
import { useMovies } from '@/stores/movies';
import { computed, ref, watch } from 'vue';

const result = useMovies()

// Filter data by genres
const filterGen = computed(() => {
  return result.film.values.filter(movie => movie.genre === result.nameList.genre)
})

//Call the API when pagination change
const onClickHandler = (page) => {
  result.getMovies(page)
};

// Llamar a la API inicialmente si se ha buscado algo
if (result.nameList.title) {
    result.getMovies(result.currentPage.value);
}

</script>

<template>
  <div class="flex flex-col items-center justify-items-center bg-background space-y-8">
    <h2 class="text-2xl font-bold uppercase justify-center" :class="[result.film.length > 0 ? 'mt-10' : 'mt-10']">
      {{ result.film.length > 0 ? 'Search Result' : 'Search Anyway' }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">

      <!-- Card -->
      <CardComponent v-for="movie in result.film" :movie="movie" :key="movie.id" />

      <!-- Paginacion -->

    </div>
    
    <div class="flex space-x-1 pb-10" v-if="result.film.length > 0">

      <!-- Awsome -->
      <vue-awesome-paginate 
        :total-items="result.nameList.total_pages" v-model="result.currentPage" :items-per-page="1" @click="onClickHandler" 
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
