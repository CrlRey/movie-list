import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useMovies } from "./movies";
import { useFavoritesStore } from "./favorites";


export const useModal = defineStore('modal', () => {

    const storeMovies = useMovies()
    const storeFavorites = useFavoritesStore()
    const modal = ref(false)

    function showModal(){
        modal.value = !modal.value
        storeFavorites.initializeFavoriteStatus()
    }

    const favoriteButton = computed(() => {
        return !storeFavorites.ifExistFavoriteTv(storeMovies.detailsMovie.id) && !storeFavorites.ifExistFavoriteMovie(storeMovies.detailsMovie.id) 
    })

    return {
        modal,
        showModal,
        favoriteButton
    }
})