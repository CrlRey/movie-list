<script setup>
    import CardComponent from '@/components/card/CardComponent.vue';
    import { useFavoritesStore } from '@/stores/favorites';
    import { computed } from 'vue';
    const storeFavorites = useFavoritesStore()
   

    const favoritesToShow = computed(() => {
  return !storeFavorites.showFavoriteMovies ? storeFavorites.favoritesTv : storeFavorites.favoritesMovies
})

const textResult = computed(() => {
   const statusToggle = storeFavorites.showFavoriteMovies 
    ? storeFavorites.favoritesMovies 
    : storeFavorites.favoritesTv;
  return statusToggle.length > 0 ? 'Your Saves' : 'No results';
})

</script>

<template>
    <div class="flex flex-col items-center justify-items-center bg-background space-y-8">
      <h2 class="text-2xl font-bold uppercase justify-center" :class="[storeFavorites.favoritesTv.length > 0 || storeFavorites.favoritesMovies.length > 0 ? 'mt-10' : 'mt-10']">
         {{textResult}}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">
         
         <CardComponent v-for="movie in favoritesToShow" :movie="movie" :key="movie.id" :is-Favorite="true"/>
      </div>
   </div>
</template>


