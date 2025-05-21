import { useEffect, useState } from "react";
import getMovieNow from "../api/getMovieNow";
import MovieCards from "../components/MovieCards";

function MoviePage() {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    getMovieNow().
      then(data => {
        setMovie(data)
      })
  }, [])

  return (
    <main>
      <section>
        <div className="h-50 bg-jet-black">
        </div>
      </section>
      <section>
        <div className="bg-jet-black flex justify-center">
          <form className="max-w-[1080px] w-full flex flex-col gap-6">
            <div>
              <h1 className="text-platinum">Now Showing in Cinemas</h1>
            </div>
            <div className="flex text-white gap-12">
              <div className="flex flex-col gap-3">
                <label htmlFor="">Find movie</label>
                <input type="text" name="" id="" placeholder="Search your movies" className="border border-white rounded px-5 py-3" />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="">Filters</label>
                <div className="flex gap-3">
                  <label htmlFor="action" className="border px-5 py-3 border-ash rounded">
                    <input type="checkbox" name="genre" id="action" className="hidden" />
                    <span>Action</span>
                  </label>
                  <label htmlFor="adventure" className="border px-5 py-3 border-ash rounded">
                    <input type="checkbox" name="genre" id="adventure" className="hidden" />
                    <span>Adventure</span>
                  </label>
                  <label htmlFor="comedy" className="border px-5 py-3 border-ash rounded">
                    <input type="checkbox" name="genre" id="comedy" className="hidden" />
                    <span>Comedy</span>
                  </label>
                  <label htmlFor="scifi" className="border px-5 py-3 border-ash rounded">
                    <input type="checkbox" name="genre" id="scifi" className="hidden" />
                    <span>Sci-Fi</span>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section>
        <div className="bg-jet-black flex justify-center">
          <div className="max-w-[1080px] py-10">
            <div className="grid grid-cols-4 gap-3">
              {movie.map(movie =>
                <>
                  <MovieCards title={movie.title} genres={movie.genre} src={movie.img} id={movie.id} />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
export default MoviePage