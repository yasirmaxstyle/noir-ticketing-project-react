import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import MovieCards from "../components/MovieCards";
import NewsLetterSection from "../sections/NewsLetterSection";
import getMovieList from "../api/getMovieList";
import getGenreList from "../api/getGenreList";
import getBackground from "../api/getBackground";

import { FaSearch } from "react-icons/fa";

function MoviePage() {
  const [movie, setMovie] = useState([])
  const [genres, setGenres] = useState([])
  const [bgImage, setBgImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const [page, setPage] = useState(searchParams.get('page') || "")

  function getRandom(array) {
    const randomIndex = Math.floor(array.length * Math.random())
    return array[randomIndex]
  }

  useEffect(() => {
    getMovieList('discover/movie').
      then(data => setMovie(data))
    getGenreList().
      then(genre => setGenres(genre))
    getBackground().
      then(data => {
        const bg = getRandom(data)
        setBgImage(bg)
        setLoading(false)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const form = Object.fromEntries(formData.entries())
    const genres = Array.from(e.target.with_genres)
      .filter(item => item.checked)
      .map(item => item.value)
    form.with_genres = genres
    const param = new URLSearchParams(form).toString()
    getMovieList(`discover/movie?${param}`)
      .then(data => {
        setMovie(data)
      })
      .catch(error => console.log(error))
    setSearchParams(param)
  }


  const handleSearch = (e) => {
    e.preventDefault()
    const searched = e.target.search.value
    if (searched !== "") {
      setSearchParams(`query=${searched}`)
      getMovieList(`search/movie?query=${searched}`)
        .then(data => {
          setMovie(data)
        })
        .catch(error => console.log(error))
    }
  }

  const handlePage = (page) => {
    setSearchParams(`page=${page}`)
    setPage(page)
    getMovieList(`discover/movie?page=${page}`)
      .then(data => {
        setMovie(data)
      })
      .catch(error => console.log(error))
  }

  return (
    <main>
      <section>
        <div>
          <img src={bgImage || null} alt="" className="absolute z-[-2] inset-0 -translate-y-1/4 size-full grayscale aspect-9/16 object-cover" />
          {loading ?
            <div className="absolute z-[-1] size-full bg-jet-black" /> :
            // <div className="absolute z-[-1] min-h-[1080px] size-full bg-linear-to-t from-jet-black from-50% to-transparent to 100%" />
            <div className="absolute size-full z-[-1] bg-radial-[at_50%_35%] from-transparent to-jet-black to-40%" />
          }
        </div>
      </section>
      <section>
        <div className="flex justify-center">
          <div className="max-w-[1080px] w-full flex flex-col gap-6 items-center pt-50">
            <div>
              <h1 className="text-platinum text-center">Now Showing in Cinemas</h1>
            </div>
            <div className="flex flex-col gap-12 text-white justify-between items-center">
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="flex flex-col">
                  <label htmlFor="search">Find movie</label>
                  <div className="flex items-center gap-3 p">
                    <input type="text" name="search" id="search" placeholder="Search movies" className="border border-white rounded px-5 py-3 outline-0" autoComplete="off" />
                    <button type="submit" className="p-3 rounded size-full bg-ash text-jet-black hover:cursor-pointer hover:bg-sunburst">
                      <FaSearch className="text-xl" />
                    </button>
                  </div>
                </div>
              </form>
              <form onSubmit={handleSubmit} className="flex flex-col max-w-4xl w-full items-center gap-6 p-6">
                <div className="flex flex-col justify-center items-center gap-3">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {genres.map(genre =>
                      <label key={`genre-list-${genre.id}`} htmlFor={genre.name} className="has-checked:bg-ash has-checked:text-graphite border px-5 py-3 border-ash rounded">
                        <input type="checkbox" name="with_genres" id={genre.name} value={genre.id} className="hidden" />
                        <span>{genre.name}</span>
                      </label>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="border rounded-full py-3 px-5">
                    <select name="sort_by" id="sorting">
                      <option defaultValue={""}>SORT BY</option>
                      <option value="popularity.desc">POPULARITY</option>
                      <option value="primary_release_date.desc">LATEST</option>
                      <option value="title.asc">Name (A-Z)</option>
                      <option value="title.desc">Name (Z-A)</option>
                    </select>
                  </div>
                  <button type="submit" className=" bg-ash text-jet-black rounded-full py-3 font-bold px-6 hover:cursor-pointer hover:bg-sunburst">
                    FILTER
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col bg-jet-black">
        <div className="flex justify-center">
          <div className="max-w-[1080px] py-10">
            <div className="flex flex-wrap gap-3 p-6">
              {movie?.map(movie =>
                <React.Fragment key={`movie-list-${movie.id}`}>
                  <MovieCards title={movie.title} genres={movie.genre} src={movie.img} id={movie.id} />
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <div className="hidden sm:flex gap-3 mx-auto">
          {Array.from({ length: 10 }, (_, idx) =>
            <button key={`button-pagination-${idx + 1}`} className={`${page === idx + 1 && "!border-ash border-2 !text-jet-black"}border size-10 text-ash rounded hover:cursor-pointer hover:bg-ash hover:text-jet-black`} onClick={() => handlePage(idx + 1)}>
              <span>{idx + 1}</span>
            </button>)}
        </div>
      </section>
      <section>
        <NewsLetterSection />
      </section>
    </main>
  )
}
export default MoviePage