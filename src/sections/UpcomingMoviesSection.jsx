import { useEffect, useState } from "react";
import MovieCards from "../components/MovieCards";
import getMovieUpcoming from "../api/getMovieUpcoming";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

function UpcomingMoviesSection() {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    getMovieUpcoming().
      then(data => {
        setMovie(data)
      })
  }, [])
  return (
    <div className="flex flex-col justify-center items-center bg-jet-black h-screen">
      <div className="flex flex-col p-6 gap-6 max-w-[1080px] text-center">
        <h1 className="text-ash font-semibold">Exciting Movies Coming Soon</h1>
        <div className="flex gap-3 overflow-scroll">
          {movie.map(movie =>
            <>
              <MovieCards category="upcoming" title={movie.title} release={movie.release} src={movie.img} id={movie.id} />
            </>
          )}
        </div>
        <div className="flex justify-between px-5">
          <div className="flex gap-3">
            <button>
              <FaArrowLeft className="text-white text-4xl" />
            </button>
            <button>
              <FaArrowRight className="text-white text-4xl" />
            </button>
          </div>
          <div className="w-fit self-center flex gap-3 items-center">
            <h5 className="text-white font-bold rounded-full">VIEW ALL</h5>
            <FaArrowRightLong className="text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingMoviesSection