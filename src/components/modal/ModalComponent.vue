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
                    class="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-lg shrink-0">
                    <!-- Esta es la imagen -->
                    <img :src="imgUrl" alt="card-image" height={450} class="w-full h-[550px] object-cover shadow-lg" />
                  </div>

                  <div class="px-5 flex flex-col">
                    <DialogTitle as="h3"
                      class="pt-5 pb-2 border-b-[1px] border-b-slate-200 font-bold text-2xl text-black">{{
                        details.detailsMovie.title }}
                    </DialogTitle>

                    <p class="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                      {{ details.detailsMovie.overview }}
                    </p>
                    <div class="mt-auto text-end space-x-4">
                      <button @click="modal.showModal()" type="button"
                        class="p-2 border text-2xl font-semibold uppercase rounded-md mt-auto mb-5 w-min">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
</svg>


                      </button>
                      <button @click="modal.showModal()" type="button"
                        class="p-2  border text-2xl font-semibold uppercase rounded-md mb-5 w-min">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="size-8">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
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
