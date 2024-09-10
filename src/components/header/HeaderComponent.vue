<script setup>
import { RouterLink } from 'vue-router';

    
</script>

<template>
    <header>
        <div class="mx-auto container py-16">
            <div class="flex text-white font-bold text-xl">
                <nav class="space-x-5">
                    <RouterLink :to="{name: 'inicio'}" active-class="text-cyan-700">Inicio </RouterLink>
                    <RouterLink :to="{name: 'favoritos'}" active-class="text-cyan-700"> Guardados </RouterLink>
                </nav>
            </div>
        </div>
    </header>
</template>

