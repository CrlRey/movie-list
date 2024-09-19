<script setup>
import { useMovies } from '@/stores/movies';
import { computed } from 'vue';

const props = defineProps({
  pag: {
    type: Number, // Puedes ajustar el tipo según lo que esperas recibir
    required: true
  },

});

const movie = useMovies()

const isActive = computed(() => {
    return movie.page === props.pag
})

defineEmits(['nextPage'])
</script>

<template>
    <div class="flex space-x-1">
        
        <button
        @click="nextPage(movie.page)"
          :class="[isActive ? 'bg-cyan-700 text-white' : 'bg-white text-cyan-700 border border-transparent']" class="min-w-9 rounded-md py-2 px-3  text-center text-sm transition-all shadow-md ml-2">
        {{ pag }}
        </button>
        
      </div>
</template>



