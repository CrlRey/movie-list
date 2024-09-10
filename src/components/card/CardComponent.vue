<script setup>
import { useMovies } from '@/stores/movies';
import { list } from 'postcss';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const prop = defineProps({
    listFilm:{
      type: Object
    }
  })

 const imgUrl = computed(() => {
  const pathurlimg = 'https://image.tmdb.org/t/p/w500';
  return pathurlimg + prop.listFilm.poster_path;
});
 
</script>

<template>
     <div  className="bg-card rounded-lg overflow-hidden shadow-lg">
        <Link href="#" className="block" prefetch={false}>
        <img :src="imgUrl" :alt="listFilm.title" width={300} height={450} className="w-full h-[450px] object-cover" />
        </Link>
        <div className="p-4">
          <h2 className="text-lg font-bold text-card-foreground line-clamp-1">{{ listFilm.title }}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{{listFilm.release_date}}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 fill-primary" />
              <span>8.7</span>
            </div>
          </div>
        </div>
      </div>
</template>


