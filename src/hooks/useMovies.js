// import withResponse from '../mocks/with-results.json'
import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

// let previousSearch = ''
export function useMovies({ query, sort }) {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(query)
  const getMovies = useCallback(async ({ query }) => {
    if (query === previousSearch.current) return
    // if (query === previousSearch) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = query
      // previousSearch = query
      const newMovies = await searchMovies({ query })
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      // se ejecuta al final de cualquier caso (try, catch)
      setLoading(false)
    }
  }, [])
  // const getMovies = useMemo(() => {
  //   return async ({ query }) => {
  //     if (query === previousSearch.current) return
  //     // if (query === previousSearch) return
  //     try {
  //       setLoading(true)
  //       setError(null)
  //       previousSearch.current = query
  //       // previousSearch = query
  //       const newMovies = await searchMovies({ query })
  //       setMovies(newMovies)
  //     } catch (error) {
  //       setError(error.message)
  //     } finally {
  //       // se ejecuta al final de cualquier caso (try, catch)
  //       setLoading(false)
  //     }
  //   }
  // }, [])
  // const sortMovies = sort
  //   ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
  //   : movies
  const sortMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [movies, sort])

  return { movies: sortMovies, getMovies, loading, error }
}
