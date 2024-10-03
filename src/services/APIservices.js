import api from "@/lib/axios";


export default{
    obtenerCategorias(){
        return api.request('/genre/movie/list?language=en')
    },
    getMovies(title, total_pages=1){
        return api.request(`/search/movie?query=${title}&page=${total_pages}`)
    },
    getMovieId(id){
        return api.request(`/movie/${id}?language=en-US`)
    },
    getTvSeries(title, total_pages=1){
        return api.request(`/search/tv?query=${title}&page=${total_pages}`)
    },
    getTvSeriesId(id){
        return api.request(`/tv/${id}?language=en-US`)
    },
    
}