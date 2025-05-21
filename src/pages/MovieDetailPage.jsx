import { useLocation } from 'react-router'
import { useEffect, useState } from "react";
import getMovieDetail from '../api/getMovieDetail'
import convertHour from '../utils/convertHour';
import convertDate from '../utils/convertDate';

function MovieDetailPage() {
  const [movie, setMovie] = useState({})
  const location = useLocation();
  const id = location.state;

  useEffect(() => {
    getMovieDetail(id).
      then(data => {
        setMovie(data)
      })
  }, [])
  console.log(movie)
  return (
    <main>
      <section>
        <div className="h-screen w-screen relative flex flex-col items-center justify-end">
          <div className="absolute size-full z-[-2] grayscale" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }} />
          <div className="absolute size-full z-[-1] bg-linear-to-t from-jet-black from-30% to-transparent to 100%" />
          <div className='grid grid-flow-col max-w-[1080px] gap-10 mb-10'>
            <div className='rounded-xl overflow-hidden'>
              <img src={`https://image.tmdb.org/t/p/original/${movie['poster_path']}`} alt={movie.title} className='grayscale hover:grayscale-30' />
            </div>
            <div className='flex flex-col gap-12 text-ash'>
              <div className='grid gap-6'>
                <div>
                  <span className='text-5xl font-semibold'>{movie.title ? movie.title : ""}</span>
                </div>
                <div>
                  <p>{movie.overview ? movie.overview : "-"}</p>
                </div>
                <div className='flex gap-3'>
                  {movie.genre?.map((genre) => <span className="px-3 py-1 border border-white text-white rounded-full" key={genre}>{genre}</span>) || ""}
                </div>
              </div>
              <div className='flex'>
                <div className='flex flex-col gap-6 basis-1/2'>
                  <div className='grid'>
                    <span>Release date</span>
                    <span className='text-white font-semibold tracking-wide'>
                      {movie['release_date'] ? convertDate(`${movie['release_date']}`, true) : "-"}
                    </span>
                  </div>
                  <div className='grid'>
                    <span>Duration</span>
                    <span className='text-white font-semibold tracking-wide'>
                      {movie.runtime ? convertHour(movie.runtime) : "-"}
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-6'>
                  <div className='grid'>
                    <span>Directed by</span>
                    <span className='text-white font-semibold tracking-wide'>
                      {movie.director ? movie.director : "-"}
                    </span>
                  </div>
                  <div className='grid'>
                    <span>Cast</span>
                    <span className='text-white font-semibold tracking-wide'>
                      {movie.actors?.slice(0, 5).join(', ') || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div>

          </div>
          <div>

          </div>
          <div>

          </div>
        </div>
        <div></div>
      </section>
    </main>
  )
}

export default MovieDetailPage