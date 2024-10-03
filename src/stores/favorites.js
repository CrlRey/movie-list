import { defineStore } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useMovies } from './movies';
import { useModal } from "./modal";
import { useNotification } from "./Notification";

export const useFavoritesStore = defineStore('favorites', () => {

    const storeModal = useModal()
    //State movies
    const storeMovie = useMovies()
    // Favorites Save
    const favoritesMovies = ref([])

    // Favorites Tv
    const favoritesTv = ref([])

    //Switch
    const showFavoriteMovies = ref(false)

    const isFavorite = ref(false);

    const storeNotification = useNotification()

    onMounted(() => {
        favoritesTv.value = JSON.parse(localStorage.getItem('tvSeries')) ?? []
        favoritesMovies.value = JSON.parse(localStorage.getItem('movies')) ?? []
    })

    watch([favoritesMovies, favoritesTv], () => {
        saveLocalStorage()
    },
    {
        deep: true
    })

    const saveLocalStorage = () => {
        if(!storeMovie.enabled){
            localStorage.setItem('tvSeries', JSON.stringify(favoritesTv.value))
        } else {
            localStorage.setItem('movies', JSON.stringify(favoritesMovies.value))
        }
            
    }

    const ifExistFavoriteTv = () => {
        const favoritesTv = JSON.parse(localStorage.getItem('tvSeries')) ?? []
        return favoritesTv.some(favorite => favorite.id === storeMovie.detailsMovie.id)
       
    }

    const ifExistFavoriteMovie = () => {
        const favoritesMovies = JSON.parse(localStorage.getItem('movies')) ?? []
        return  favoritesMovies.some(favorite => favorite.id === storeMovie.detailsMovie.id)
    }

    function deleteFavoriteTv() {
        favoritesTv.value = favoritesTv.value.filter(tvContent => tvContent.id !== storeMovie.detailsMovie.id)
    }

    function deleteFavoriteMovies() {
        favoritesMovies.value = favoritesMovies.value.filter(movies => movies.id !== storeMovie.detailsMovie.id)
    }

    const handlerAddfavorites = () => {
        if (ifExistFavoriteMovie() || ifExistFavoriteTv()) {
            deleteFavoriteTv()
            deleteFavoriteMovies()
            isFavorite.value = false
            storeModal.modal = false
            // Notification
            storeNotification.show = true
            storeNotification.text = 'Element removed'
            storeNotification.error = true
        } else {
            enabledStatus()
            isFavorite.value = true 
        }
    }

    const enabledStatus = () => {
        if(!storeMovie.enabled){
            favoritesTv.value.push(storeMovie.detailsMovie)
        } else {
            favoritesMovies.value.push(storeMovie.detailsMovie)
        }
        storeNotification.show = true
        storeNotification.text = 'Element saved'
    }

    const initializeFavoriteStatus = () => {
        isFavorite.value = ifExistFavoriteMovie() || ifExistFavoriteTv()
    }
    

    return {
        favoritesMovies,
        isFavorite,
        handlerAddfavorites,
        saveLocalStorage,
        favoritesTv,
        showFavoriteMovies,
        ifExistFavoriteTv,
        ifExistFavoriteMovie,
        initializeFavoriteStatus
        
    }
})