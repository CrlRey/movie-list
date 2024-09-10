<script setup>
import CardComponent from '@/components/card/CardComponent.vue';
import { useMovies } from '@/stores/movies';

const result = useMovies()

</script>

<template>
  <div className="flex flex-col items-center justify-center min-h-screen bg-background">
    <h2 class="text-2xl font-bold">Search Result</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">
      
      <!-- Card -->
       <CardComponent
        v-for="movie in result.film" :listFilm="movie" :key="movie.id"
       />
    </div>
  </div>
</template>


