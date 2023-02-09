// import withResponse from '../mocks/with-results.json'
import { useState, useRef } from 'react'
import { searchMovies } from '../services/movies'
export function useMovies({ query }) {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(query)
  const getMovies = async () => {
    if (query === previousSearch.current) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = query
      const newMovies = await searchMovies({ query })
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      // se ejecuta al final de cualquier caso (try, catch)
      setLoading(false)
    }
  }
  return { movies, getMovies, loading, error }
}
