<script setup>
import { RouterLink } from 'vue-router';

    
</script>

<template>
    <header>
        <div class="mx-auto container py-10 ">
            <div class=" text-white font-bold text-xl">
                <nav class="space-x-5 flex max-sm:flex-col max-sm:space-x-0 max-sm:text-center max-sm:space-y-4">
                    <RouterLink :to="{name: 'inicio'}" active-class="text-cyan-700">Inicio </RouterLink>
                    <RouterLink :to="{name: 'favoritos'}" active-class="text-cyan-700"> Guardados </RouterLink>
                </nav>
            </div>
        </div>
    </header>
</template>

