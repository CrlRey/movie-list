import { defineStore } from 'pinia'
import { onMounted, reactive, ref } from 'vue'
import APIservices from '@/services/APIservices'
import { useModal } from './modal'
import { data } from 'autoprefixer'
import foreachMovie from '@/helpers/foreachMovie'


export const useMovies = defineStore('movies', () => {
  const modal = useModal()

  // Save genres select
  const movieList = ref([])

  // Save data form title and genre for search
  const nameList = reactive({
    title: '',
    genre: '',
    total_pages : '',
  })

  // Show results from movies
  const film = ref([])

  // Save data from a specific movie
  const detailsMovie = ref({})

  // Save genres for modal
  const gen = ref([])

  // Total pages
const currentPage = ref(1)

// Switch value tv/movie
const enabled = ref(false)

  onMounted(async () => {
    try { const {data: { genres }} = await APIservices.obtenerCategorias()
      foreachMovie.forDataPush(genres, movieList)
    } catch (error) {
      console.error(error)
    }
  })

  async function getMovies(currentPage) {
    const { data } = await APIservices.getMovies(nameList.title, currentPage)
    nameList.total_pages = data.total_pages
    film.value = data.results
  }

  async function getDetailsMovie(id) {
    const { data } = await APIservices.getMovieId(id)
    detailsMovie.value = data
    gen.value = []
    foreachMovie.forGenPush(detailsMovie, gen)
    modal.showModal()
  }

  async function getTvSeries(currentPage) {
    const { data } = await APIservices.getTvSeries(nameList.title, currentPage)
    nameList.total_pages = data.total_pages
    film.value = data.results
  }

  async function getDetailsTvSeries(id) {
    const { data } = await APIservices.getTvSeriesId(id)
    detailsMovie.value = data
    gen.value = []
    foreachMovie.forGenPush(detailsMovie, gen)
    modal.showModal()
  }

  return {
    movieList,
    nameList,
    getMovies,
    film,
    gen,
    currentPage,
    enabled,
    getDetailsMovie,
    detailsMovie,
    getTvSeries,
    getDetailsTvSeries
  }
})
