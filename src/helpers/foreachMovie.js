export default {
    // Genres names for
    forDataPush(data, movieList=[]) {
        data.forEach(element => {
            movieList.value.push(element.name)
        });
    },

    // 
    forGenPush(data, gen=[]){
        data.value.genres.forEach((element) => {
            gen.value.push(element.name)
          })
    }

    
}   