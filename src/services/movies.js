const API_KEY = '4287ad07'
export const searchMovies = async ({ query }) => {
  if (!query) return
  try {
    if (query) {
      // setReponseMovies(withResponse)
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      )
      const data = await response.json()
      const movies = data.Search
      return movies?.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }))
    }
  } catch (error) {
    throw new Error(' Error en la busqueda de peliculas')
  }
}
