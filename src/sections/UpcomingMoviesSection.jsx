import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
import MovieCards from "../components/MovieCards";
import getMovieList from "../api/getMovieList";

function UpcomingMoviesSection() {
  const [movie, setMovie] = useState([])
  const [arrowDisable, setArrowDisable] = useState(true)
  const [loading, setLoading] = useState(true)
  const cards = useRef()

  function handleScroll(element, speed, distance, step) {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true)
      } else {
        setArrowDisable(false)
      }
    }, speed)
  }

  useEffect(() => {
    getMovieList('movie/upcoming').
      then(data => {
        setMovie(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex flex-col justify-center items-center bg-jet-black h-screen">
      <div className="flex flex-col p-6 gap-6 max-w-[1080px] w-full text-center">
        <h1 className="text-ash font-semibold">Exciting Movies Coming Soon</h1>
        {loading ?
          <div className="w-full flex gap-3 h-[565px]">
            {Array.from({ length: 4 }, (_, idx) =>
              <div key={`skeleton-upcoming-${idx}`} className="rounded-xl shrink-0 h-full basis-[calc((1/4*100%)-12px)] animate-pulse bg-platinum" />)}
          </div> :
          <div ref={cards} className="flex gap-3 overflow-hidden">
            {movie.map(movie =>
              <>
                <MovieCards key={`upcoming-${movie.id}`} category="upcoming" title={movie.title} release={movie.release} src={movie.img} id={movie.id} />
              </>
            )}
          </div>
        }
        <div className="flex justify-between px-5">
          <div className="flex gap-3">
            <button onClick={() =>
              handleScroll(cards.current, 250, cards.current.clientWidth, -cards.current.clientWidth)}
              disabled={arrowDisable}
              className="hover:cursor-pointer disabled:text-ash text-sunburst">
              <FaArrowLeft className="text-4xl" />
            </button>
            <button onClick={() =>
              handleScroll(cards.current, 250, cards.current.clientWidth, cards.current.clientWidth)}
              className="hover:cursor-pointer disabled:text-ash text-sunburst">
              <FaArrowRight className="text-4xl" />
            </button>
          </div>
          <div className="w-fit self-center flex gap-3 items-center text-white hover:text-sunburst">
            <Link to={'/movie'} className="font-bold rounded-full">VIEW ALL</Link>
            <FaArrowRightLong />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingMoviesSection