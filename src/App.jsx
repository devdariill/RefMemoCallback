import './App.css'
// eslint-disable-next-line no-unused-vars
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies'
import { useRef, useState, useEffect } from 'react'

function useSearch() {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('') // zod para validar forms
  const firstInput = useRef(true)
  useEffect(() => {
    if (firstInput.current) {
      firstInput.current = query === ''
      return
    }
    if (query === '') {
      setError('Please enter a movie title')
      return
    }
    if (query.length < 3) {
      setError('Please enter at least 3 characters')
      return
    }
    setError(null)
  }, [query])
  return { query, setQuery, error }
}
function App() {
  const counter = useRef(0) // valor que persiste entre renders
  counter.current++
  console.log(counter.current)

  const { query, setQuery, error } = useSearch()
  const inputRef = useRef()
  const handleChange = (event) => {
    const value = event.target.value
    if (value.startsWith(' ')) return null
    else {
      setQuery(value)
    }
  }

  const handleClick = () => {
    const value = inputRef.current.value
    console.log(value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const fields = new window.FormData(event.target)
    const queryclg = fields.get('query')
    console.log(queryclg)
    console.log({ query })
    getMovies()
  }
  const { movies, loading, getMovies } = useMovies({ query })
  return (
    <div className="page">
      <header>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            ref={inputRef}
            value={query}
            name="query"
            placeholder="Avengers, Star Wars, The Matrix"
          />
          <button onClick={handleClick} type="submit">
            Submit
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App
