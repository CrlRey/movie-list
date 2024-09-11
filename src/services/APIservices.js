import api from "@/lib/axios";


export default{
    obtenerCategorias(){
        return api.request('/genre/movie/list?language=en')
    },
    getMovies({title}){
        return api.request(`/search/movie?query=${title}`)
    },
    getMovieId(id){
        return api.request(`/movie/${id}?language=en-US`)
    }
}