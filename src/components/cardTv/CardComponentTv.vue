<script setup>
import ImgComponent from '@/assets/img/svgComponents/ImgComponent.vue';
import { useMovies } from '@/stores/movies';
import { list } from 'postcss';
import { computed } from 'vue';
import { useRoute } from 'vue-router';


const detail = useMovies()

const prop = defineProps({
  movie: {
    type: Object
  }
});

const sliceStr = computed(() => {
  if (prop.movie.release_date) {
    const strRelease = prop.movie.release_date.slice(0, 4)
    return strRelease
  }
   return "N/A"
});

const imgUrl = computed(() => {
  const pathurlimg = 'https://image.tmdb.org/t/p/w500';
  return pathurlimg + prop.movie.poster_path;
});

const popularity = computed(() => {
  const ratingStr = prop.movie.vote_average
  return Math.floor(ratingStr * 10)
})

</script>

<template>
  <div class="rounded-lg overflow-hidden shadow-lg max-sm:w-3/4 max-sm:mx-auto">
    <a href="#" class="block" prefetch={false}>
      <div class="group bg-black hover hover:scale-105 transition-all text-center">
        <img :src="[prop.movie.poster_path ? imgUrl : '/img/NoImage.png']" :alt="movie.title" width=300 height=450
        class="w-full h-[450px] hover:opacity-50 transition-all" />
        <!-- TODO: BUTTON HOVER -->
      </div>
    </a>
    <div class="p-4">
      <h2 class="text-lg font-bold text-card-foreground line-clamp-1">{{ movie.title }}</h2>
      <div class="flex gap-2 text-sm text-muted-foreground">
        <span>{{ sliceStr }}</span>
        <span>•</span>
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4 text-yellow-400">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
          <span>{{ popularity }}%</span>
        </div>
        <div class="text-end w-full text-cyan-700 font-bold uppercase">
          <button @click="detail.getDetailsMovie(movie.id)">show more</button>
        </div>
      </div>
      
    </div>
  </div>

  
</template>
