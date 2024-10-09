<script setup>
import { useMovies } from '@/stores/movies';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
 import { Switch } from '@headlessui/vue'
import { useNotification } from '@/stores/Notification';



const name = useRoute()
const showForm = computed(() => name.name === 'inicio')

const store = useMovies();
const storeNotification = useNotification()

const validateForm = () => {
    store.getMovies(store.currentPage)
}

const validateFormTv = () => {
    store.getTvSeries(store.currentPage)
}
const handlerValidate = () => {
    if (store.nameList.title.trim() === '') {
        storeNotification.$patch({
            text: 'all fields are required',
            show: true,
            error: true
        })
        return    
    }
    filterSearch()
}

const filterSearch = () => {
    if (store.enabled) {
        store.currentPage = 1
       return validateForm()
    }
       store.currentPage = 1
       return validateFormTv()
}

</script>

<template>
    <div class="md:w-1/2 bg-white rounded-md px-10 shadow-md z-10 max-sm:mx-5 max-sm:w-full">
        <form v-if="showForm" @submit.prevent="handlerValidate()">
            <div class="flex justify-between">
                <div class="flex-grow">
                    <div class="py-8">
                        <h1 class="text-2xl font-bold text-primary-foreground text-black">Movie Search</h1>
                        <p class="text-muted-foreground text-black">Find your favorite movies with ease.</p>
                        <div class="flex items-center space-x-5 mt-5 max-sm:block max-sm:space-x-0 max-sm:space-y-5">
                            <div class="flex-grow">
                                <label for="title" class="block font-bold text-2xl">Title movie</label>
                                <input type="text" id="title" class="p-2 w-full rounded-sm bg-slate-100"
                                    v-model="store.nameList.title">
                            </div>
                            <div class="">
                                <p class="text-2xl font-bold">Search Only in</p>
                                <div class="flex items-center space-x-2 py-2">
                                    <p>TV Series</p>
                                    <!-- Switch -->
                                    <Switch v-model="store.enabled" :class="store.enabled ? 'bg-cyan-500' : 'bg-teal-500'"
                                        class="relative inline-flex h-6 w-11 items-center rounded-full">
                                        <span class="sr-only">Enable notifications</span>
                                        <span :class="store.enabled ? 'translate-x-6' : 'translate-x-1'"
                                            class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                    </Switch>
                                    <p>Movies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit"
                class="bg-gradient-to-r from-cyan-500 to-blue-500 mb-5 font-bold rounded-md p-2 w-full shadow-md text-white">SEARCH</button>
        </form>
    </div>
</template>
