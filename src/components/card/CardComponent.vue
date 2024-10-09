<script setup>
import { useFavoritesStore } from '@/stores/favorites';
import { useMovies } from '@/stores/movies';
import { computed } from 'vue';
const store = useMovies()
const favoriteStore = useFavoritesStore()
const storeFavorites = useFavoritesStore()

const props = defineProps({
  movie: {
    type: Object
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
});

//Saber si es favorite o no
const contentDetails = () => {
  if (props.isFavorite) {
    // Si es un favorito, usa el estado del store de favoritos
    return favoriteStore.showFavoriteMovies
      ? store.getDetailsMovie(props.movie.id)
      : store.getDetailsTvSeries(props.movie.id);
  } else {
    // Si no es un favorito
    return store.enabled
      ? store.getDetailsMovie(props.movie.id)
      : store.getDetailsTvSeries(props.movie.id);
  }
}

const sliceStr = computed(() => {
  if (props.movie.release_date) {
    const strRelease = props.movie.release_date.slice(0, 4)
    return strRelease
  } else if (props.movie.first_air_date) {
    const strRelease = props.movie.first_air_date.slice(0, 4)
    return strRelease
  }
  return "NA"
});

const imgUrl = computed(() => {
  const pathurlimg = 'https://image.tmdb.org/t/p/w500';
  return pathurlimg + props.movie.poster_path;
});

const popularity = computed(() => {
  const ratingStr = props.movie.vote_average
  return Math.floor(ratingStr * 10)
})

const contentTitle = computed(() => {
  return props.movie.title || props.movie.name
})

</script>

<template>
  <div class="rounded-lg overflow-hidden shadow-lg max-sm:w-3/4 max-sm:mx-auto">
    <div class="relative group ">
      <div class="hover:transition-all hover:scale-105 flex items-center justify-center z-10 bg-black">
        <img :src="[props.movie.poster_path ? imgUrl : '/img/NoImage.png']" :alt="movie.title" width=300 height=450
          class="w-full h-[450px] transition-all" />
      </div>
    </div>
    <div class="p-4">
      <h2 class="text-lg font-bold text-card-foreground line-clamp-1">{{ contentTitle }}</h2>
      <div class="flex gap-2 text-sm text-muted-foreground">
        <span>{{ sliceStr }}</span>
        <span>•</span>
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            class="size-4 text-yellow-400">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
          <span>{{ popularity }}%</span>
        </div>
        <div class="text-end w-full text-cyan-700 font-bold uppercase">
          <button @click="contentDetails()">show more</button>
        </div>
      </div>

    </div>
  </div>


</template>
