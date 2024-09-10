import axios from 'axios'


const options = { 
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjcwYjhjNzE1OWFjMzM5NTkzYTY1NGM1ZTZjNzQ4OCIsIm5iZiI6MTcyNTk4NDM5My4wMTExMiwic3ViIjoiNjZkZTNiOTcyYjRlMDM4ZmJlZTQzYWJhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.8It2BxG0fokqcp_S1Myq3VhHeTjQq55An_tJhPJ3JD4'
      }
  }

const api = axios.create(options)

export default api