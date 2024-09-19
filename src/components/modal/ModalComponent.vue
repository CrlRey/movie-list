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

const modal = useModal()
const details = useMovies()

const imgUrl = computed(() => {
  const pathurlimg = 'https://image.tmdb.org/t/p/w500';
  return pathurlimg + details.detailsMovie.poster_path;
});

const sliceStr = computed(() => {
if (details.detailsMovie.release_date) {
  const strRelease = details.detailsMovie.release_date.slice(0, 4)
  return strRelease
}
return 'N/A'
})

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

                <div class="relative flex bg-clip-border rounded-xl bg-white text-gray-700 w-full flex-row">
                  <div
                    class="relative w-2/5 m-0 overflow-hidden h-auto text-gray-700 bg-white rounded-r-none bg-clip-border rounded-lg shrink-0">
                    <!-- Esta es la imagen -->
                    <img :src="[details.detailsMovie.poster_path ? imgUrl : '/img/NoImage.png']" alt="card-image" height={450}
                      class="w-full h-[550px] object-cover shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500" />
                  </div>

                  <div class="px-5 flex flex-col w-full">
                    <DialogTitle as="h3" class="pt-5 pb-2  font-bold text-2xl text-black">{{
                      details.detailsMovie.title }}
                      <div class="mt-2 space-x-3">
                        <DialogTitle as="h4" class="rounded-sm border inline-block px-2 shadow-sm">
                          {{ sliceStr }}
                        </DialogTitle>
                        <p class="inline-block  border px-2 rounded-sm shadow-sm">
                          {{ details.detailsMovie.runtime }} Min
                        </p>

                      </div>

                    </DialogTitle>
                    <div class="space-x-2 border-b-[1px] border-b-slate-200 pb-2 italic text-neutral-400">
                      <p class="inline font-sans" v-for="(genres, index) in details.gen" :key="index">
                        {{ genres }}
                      </p>
                    </div>
                    <p
                      class="block mb-8 font-sf text-sm antialiased font-normal leading-relaxed text-gray-700 mt-2">
                      {{ details.detailsMovie.overview }}
                    </p>

                    <div class="mt-auto text-end space-x-4">
                      <button @click="modal.showModal()" type="button"
                        class="p-2 text-2xl font-semibold uppercase rounded-md mt-auto mb-5 w-min hover:text-yellow-400 transition duration-150 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8">
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
