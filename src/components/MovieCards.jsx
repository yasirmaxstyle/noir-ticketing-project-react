import { Link } from "react-router"
import convertDate from "../utils/convertDate"
import ImageWithFallback from "./ImageWithFallback"
import { useSelector } from "react-redux"

export default function MovieCards({ category, title, genres, release, src, id }) {
  const currentUser = useSelector((state) => state.auth.data)
  const dataOrder = useSelector(state => state.transaction.data)
  const userId = currentUser[0]?.data.id
  const userOrder = dataOrder.filter(e => {
    if (e.createdBy === userId) return e
  })

  return (
    <div className="flex grow flex-col gap-3 items-center rounded-xl shrink-0 basis-[calc((1*100%)-12px)] sm:basis-[calc((1/2*100%)-12px)] md:basis-[calc((1/3*100%)-12px)] lg:basis-[calc((1/4*100%)-12px)] group bg-radial-[at_25%_45%] from-graphite to-jet-black to-65% border-graphite border">
      <div className="w-full overflow-hidden rounded-xl relative">
        <div className="hidden bg-black opacity-50 absolute w-full h-full z-[1] group-hover:block" />
        <div className="hidden absolute inset-0 translate-y-1/3 group-hover:grid justify-center z-[2]">
          <div className="flex flex-col gap-3">
            <Link to={`/movie/${id}`} className="border border-white px-5 py-3 rounded text-center">
              <span className="text-white">
                VIEW DETAILS
              </span>
            </Link>
            {userOrder.find(e => e.id === String(id)) ?
              <Link to={`/seat/${id}`} className="bg-marigold px-5 py-3 rounded text-center">
                <span className="text-white">
                  BUY TICKET
                </span>
              </Link> :
              <Link to='' className="bg-marigold px-5 py-3 rounded text-center">
                <span className="text-white">
                  BUY TICKET
                </span>
              </Link>
            }
          </div>
        </div>
        <div className="w-full h-full flex justify-center items-center text-center">
          <ImageWithFallback
            src={src || null}
            alt={title}
            loading="lazy"
            className="group-hover:scale-110 group-hover:rotate-1 ease-in duration-300 grayscale group-hover:grayscale-0 aspect-2/3 object-cover"
          />
        </div>
      </div>
      <div className="p-3 w-full flex flex-col items-center gap-3 text-center">
        <span className="font-bold text-platinum text-2xl">{title}</span>
        <div className="flex gap-2 flex-wrap py-3">
          {genres?.map(genre => {
            return (
              <span key={`${category}${genre}`} className="text-ash border-ash border rounded-full px-3 py-0.5">{genre}</span>
            )
          })
            || <span className="text-ash">{convertDate(release, false)}</span>}
        </div>
      </div>
    </div>
  )
}