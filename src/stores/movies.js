import { defineStore } from 'pinia'
import { onMounted, reactive, ref } from 'vue'
import APIservices from '@/services/APIservices'
import { useModal } from './modal'



export const useMovies = defineStore('movies',() => {

  const modal = useModal()
  
  const movieList = ref([])

  const nameList = reactive({
    title: '',
    genre: ''
  })

  const film = ref([])

  const detailsMovie = ref({})


  onMounted(async () => {
    try {
       const {data: {genres}} = await APIservices.obtenerCategorias()
       genres.forEach(element => {
        movieList.value.push(element.name) 
       });
      } catch (error) {
        console.error(error)
      }
  })

  async function getMovies(){
    const {data: {results}} = await APIservices.getMovies(nameList)
    film.value = results
    console.log(results);
  }

  async function getDetailsMovie(id) {
    const {data} = await APIservices.getMovieId(id)
    console.log(data);
    detailsMovie.value = data
    modal.showModal()
  }

  return {
    movieList,
    nameList,
    getMovies,
    film,
    getDetailsMovie,
    detailsMovie
  }
})
