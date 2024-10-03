<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Switch } from '@headlessui/vue'
import { useMovies } from '@/stores/movies';
import { useFavoritesStore } from '@/stores/favorites';


const name = useRoute()
const showForm = computed(() => name.name === 'favoritos')
const storeMovies = useMovies()
const storeFavorites = useFavoritesStore()





</script>

<template>
    <div class="absolute flex max-sm:w-full" v-if="showForm">
        <div class=" bg-white rounded-md px-10 shadow-md z-10 mx-auto max-sm:w-full max-sm:mx-5 pt-3 ">
            <p class="text-lg font-bold max-sm:text-center">Show only on</p>
            <div class="flex items-center space-x-2 py-2 max-sm:justify-center">
                <p>TV Series</p>
                <!-- Switch -->
                <Switch v-model="storeFavorites.showFavoriteMovies" :class="storeFavorites.showFavoriteMovies ? 'bg-cyan-500' : 'bg-teal-500'"
                    class="relative inline-flex h-6 w-11 items-center rounded-full">
                    <span class="sr-only">Enable notifications</span>
                    <span :class="storeFavorites.showFavoriteMovies ? 'translate-x-6' : 'translate-x-1'"
                        class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </Switch>
                <p>Movies</p>
            </div>
        </div>
    </div>
</template>
