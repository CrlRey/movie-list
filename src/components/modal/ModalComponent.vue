<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { useModal } from '@/stores/modal';
import { useMovies } from '@/stores/movies';
import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';

const modal = useModal()
const store = useMovies()
const favorites = useFavoritesStore()

const imgUrl = computed(() => {
  const pathurlimg = 'https://image.tmdb.org/t/p/w500';
  return pathurlimg + store.detailsMovie.poster_path;
});

const sliceStr = computed(() => {
  if (store.detailsMovie.release_date) {
    const strRelease = store.detailsMovie.release_date.slice(0, 4)
    return strRelease
  } else if (store.detailsMovie.first_air_date) {
    const strRelease = store.detailsMovie.first_air_date.slice(0, 4)
    return strRelease
  }
  return "N/A"
})

const popularity = computed(() => {
  const ratingStr = store.detailsMovie.vote_average
  return Math.floor(ratingStr * 10)
})

const contentTitle = computed(() => {
  return store.detailsMovie.title || store.detailsMovie.name
})

const contentDuration = computed(() => {
  if (store.detailsMovie.number_of_episodes && store.detailsMovie.number_of_seasons) {
    const episodes = store.detailsMovie.number_of_episodes + ' ' + 'Episodes'
    const seasons = store.detailsMovie.number_of_seasons + ' ' + 'Seasons'
    return {
      episodes,
      seasons
    }
  } else if (store.detailsMovie.runtime) {
    const runtime = store.detailsMovie.runtime + ' MIn'
    return {
      runtime
    }
  }
  return 'N/A'
})

const handlerFavorite = () => {
  favorites.handlerAddfavorites()

}

</script>

<template>
  <TransitionRoot as="template" :show="modal.modal" enter="duration-300 ease-out" enter-from="opacity-0"
    enter-to="opacity-100">
    <Dialog as="div" class="relative z-10" @close="modal.showModal()">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">

            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
              <div class="text-end">

              </div>

              <div class="">
                <!-- Contenido del modal -->

                <div
                  class="relative flex bg-clip-border rounded-xl bg-white text-gray-700 w-full flex-row max-sm:flex-col">
                  <div
                    class="relative w-2/5 max-sm:w-full m-0 overflow-hidden h-auto text-gray-700 bg-white rounded-r-none bg-clip-border rounded-lg shrink-0 max-sm:rounded-b-none">
                    <!-- Esta es la imagen -->
                    <img :src="[store.detailsMovie.poster_path ? imgUrl : '/img/NoImage.png']" alt="card-image"
                      height={450} class="w-full h-[550px] object-cover shadow-lg " />
                  </div>

                  <div class="px-5 flex flex-col w-full">
                    <DialogTitle as="h3" class="pt-5 pb-2  font-bold text-2xl text-black">{{
                      contentTitle }} <p class="inline-block opacity-40">({{ sliceStr }})</p>
                      <div class="mt-2 space-x-3">
                        <p v-if="store.detailsMovie.seasons && store.detailsMovie.first_air_date"
                          class="inline-block  border px-2 rounded-sm shadow-sm">
                          {{ contentDuration.seasons }}
                        </p>
                        <p v-if="store.detailsMovie.runtime || store.detailsMovie.number_of_episodes"
                          class="inline-block  border px-2 rounded-sm shadow-sm">
                          {{ store.detailsMovie.runtime ? contentDuration.runtime : contentDuration.episodes }}
                        </p>
                        <p class="inline-block border rounded-sm shadow-sm px-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            class="size-6 text-yellow-400 inline-block">
                            <path fill-rule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clip-rule="evenodd" />
                          </svg>
                          {{ popularity }}%
                        </p>

                      </div>

                    </DialogTitle>
                    <div class="space-x-2 border-b-[1px] border-b-slate-200 pb-2 italic text-neutral-400">
                      <p class="inline font-sans" v-for="(genres, index) in store.gen" :key="index">
                        {{ genres }}
                      </p>
                    </div>
                    <p class="block mb-8 font-sf text-sm antialiased font-normal leading-relaxed text-gray-700 mt-2">
                      {{ store.detailsMovie.overview }}
                    </p>

                    <div class="mt-auto text-end space-x-4">
                      <button @click="handlerFavorite()" type="button"
                        class="p-2 text-2xl font-semibold uppercase rounded-md mt-auto mb-5 w-min hover:text-yellow-400 transition duration-150 ease-in-out">
                        <svg v-if="!favorites.isFavorite" xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 text-yellow-400">
                          <path fill-rule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clip-rule="evenodd" />
                        </svg>
                      </button>
                      <button @click="modal.showModal()" type="button"
                        class="p-2 text-2xl font-semibold uppercase rounded-md mb-5 w-min hover:text-red-700 transition duration-150 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8">
                          <path fill-rule="evenodd"
                            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd" />
                        </svg>

                      </button>
                    </div>

                  </div>
                </div>
              </div>

              <div class=" flex justify-between gap-4">

              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
