<script setup>
import { useMovies } from '@/stores/movies';
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';


    const name = useRoute()
    const showForm = computed(() => name.name === 'inicio')

    const store = useMovies();
    console.log(store.nameList);



    const validateForm = () => {
        store.getMovies()
    }
    
</script>


<template>
    <div class="md:w-1/2 bg-white rounded-md px-10 shadow-md z-10">
        <form v-if="showForm" @submit.prevent="validateForm">
            <div class="py-8">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-primary-foreground text-black">Movie Search</h1>
                    <p class="text-muted-foreground text-black">Find your favorite movies with ease.</p>
                </div>
                <div class="relative space-y-2">

               <label for="title" class="block font-bold text-2xl">Title movie</label>

               <input type="text" id="title" class="p-2 w-full rounded-sm bg-slate-100" v-model="store.nameList.title">

                    <label for="genero" class="block text-2xl font-bold text-primary-foreground text-black">Genero</label>

                    <select id="genero" class="bg-slate-100 p-2 w-full rounded-md focus:outline-none text-black" v-model="store.nameList.genre">
                        <option value="">
                            --SELECCIONE--
                        </option>
                        <option class="text-black" v-for="mvList in store.movieList" :key="mvList" :value="mvList">
                            {{ mvList }}
                        </option>
                    </select>

                </div>
            </div>
            <button type="submit" class="bg-cyan-700 mb-5 font-bold rounded-md p-2 w-full shadow-md text-white" >BUSCAR</button>
        </form>
    </div>
</template>

