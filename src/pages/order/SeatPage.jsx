import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Seat from "../../components/Seat"
import { useNavigate, useParams } from "react-router"
import { addSeatAction, cancelOrderAction } from "../../redux/reducers/transaction"

import { FaCheck } from "react-icons/fa6";

function SeatPage() {
  const dataOrder = useSelector(state => state.transaction.data)
  const [seatChosen, setSeatChosen] = useState([])
  const { id } = useParams()
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const currentOrder = dataOrder.find(data => data.id === id)

  const handleSubmit = (e) => {
    e.preventDefault()
    const obj = {
      seat: seatChosen,
      transactionId: currentOrder.transactionId
    }
    dispatch(addSeatAction(obj))
    setTimeout(() => {
      navigate(`payment`)
    }, 1000);
  }

  const handleSeat = (e) => {
    if (!seatChosen.includes(e.target.value) && e.target.checked === true) {
      setSeatChosen([
        ...seatChosen,
        e.target.value
      ])
    } else {
      setSeatChosen(seatChosen.filter(seat => seat !== e.target.value))
    }
  }
  const handleChange = (e) => {
    e.preventDefault()
    dispatch(cancelOrderAction(currentOrder.transactionId))
    navigate(`/movie/${id}`)
  }

  const SEAT_PRICE = 50000
  return (
    <section>
      <div className="py-20 w-screen flex flex-col justify-center items-center bg-jet-black">
        <div className="text-white flex flex-col items-center gap-3 max-w-xl w-full mb-12">
          <div className="flex items-center gap-3 w-full">
            <div className="mx-3 size-10 rounded-full bg-ash flex justify-center items-center text-jet-black"><FaCheck /></div>
            <div className="border border-dashed flex-1 h-0" />
            <div className="mx-3 size-10 rounded-full bg-sunburst flex justify-center items-center text-jet-black">2</div>
            <div className="border border-dashed flex-1 h-0" />
            <div className="mx-3 size-10 rounded-full border border-ash flex justify-center items-center text-ash">3</div>
          </div>
          <div className="flex justify-between w-full">
            <div className="w-16 text-center">
              <span>Date & Time</span>
            </div>
            <span className="text-sunburst">Seat</span>
            <span className="text-ash">Payment</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-6 max-w-[1080px] w-full mx-auto">
          <div className="flex flex-col justify-center bg-graphite p-6  rounded">
            <div className="flex px-3 py-3 border border-ash rounded gap-3 text-ash">
              <div className="grid w-40 overflow-hidden rounded">
                <img src={`https://image.tmdb.org/t/p/original/${currentOrder.movie.poster_path}`} alt={currentOrder.movie.title} className="aspect-16/9 object-cover grayscale hover:grayscale-25" />
              </div>
              <div className="gap-1 flex flex-col w-full">
                <div className="text-sunburst font-bold">{currentOrder.movie.title}</div>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">{currentOrder.movie.genre.slice(0, 2).map((genre, idx) => <span className="px-3 bg-ash text-graphite rounded-full" key={`list-${genre}-${idx}`}>{genre}</span>)}
                    </div>
                    <span>REGULAR - {currentOrder.data.time}</span>
                  </div>
                  <button type="button" onClick={(e) => handleChange(e)} className="bg-sunburst text-jet-black font-bold px-5 rounded hover:bg-marigold">
                    CHANGE
                  </button>
                </div>
              </div>
            </div>
            <h4 className="text-white font-bold mt-3">Choose Your Seat</h4>
            <div className="py-6 px-12 flex flex-col gap-6">
              <div className="text-center border border-ash rounded py-1">
                <span className="text-white text-center">Screen</span>
              </div>
              <div className="flex gap-3 w-fit">
                <div className="grid gap-3">
                  {Array.from(['A', 'B', 'C', 'D', 'E', 'F', 'G', ''], (letter) =>
                    <div className="size-5 text-white flex justify-center items-center">
                      <span>{letter}</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-12 w-fit">
                  <div className="grid gap-3">
                    <div className='grid grid-cols-7 gap-3'>
                      {Array.from(['A', 'B', 'C', 'D', 'E', 'F', 'G'], (letter) =>
                        Array.from({ length: 7 }, (_, idx) =>
                          <Seat onChange={handleSeat}
                            name='seat'
                            idx={`seat-${letter}${idx + 1}`}
                            value={`${letter}${idx + 1}`}
                            order={currentOrder}
                          />
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-3 w-full">
                      {Array.from({ length: 7 }, (_, idx) =>
                        <div className="size-5 text-white flex justify-center items-center">
                          <span>{idx + 1}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className='grid grid-cols-7 gap-3'>
                      {Array.from(['A', 'B', 'C', 'D', 'E', 'F', 'G'], (letter) =>
                        Array.from({ length: 7 }, (_, idx) =>
                          <Seat onChange={handleSeat}
                            name='seat'
                            idx={`seat-${letter}${idx + 8}`}
                            value={`${letter}${idx + 8}`}
                            order={currentOrder}
                          />
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-3 w-full">
                      {Array.from({ length: 7 }, (_, idx) =>
                        <div className="size-5 text-white flex justify-center items-center">
                          <span>{idx + 8}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-white flex flex-col gap-3">
                <span className="font-bold">Seating Key</span>
                <div className="flex gap-6 *:flex *:gap-3 *:**:first:size-5 *:**:first:rounded ">
                  <div>
                    <div className="bg-ash" />
                    <span>Available</span>
                  </div>
                  <div>
                    <div className="bg-sunburst" />
                    <span>Selected</span>
                  </div>
                  <div>
                    <div className="bg-pink-400" />
                    <span>Love Nest</span>
                  </div>
                  <div>
                    <div className="bg-gray-500" />
                    <span>Sold</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="bg-graphite py-6 rounded">
              <h2 className="text-sunburst text-center font-bold">{currentOrder.data.cinema}</h2>
              <div className="p-6 text-ash flex flex-col gap-3 *:flex *:justify-between *:gap-3 *:**:nth-[2]:text-sunburst *:**:nth-[2]:font-bold">
                <div>
                  <span>Movie selected</span>
                  <span>{currentOrder.movie.title}</span>
                </div>
                <div>
                  <span>{currentOrder.data.date}</span>
                  <span>{currentOrder.data.time}</span>
                </div>
                <div>
                  <span>One ticket price</span>
                  <span>IDR {SEAT_PRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                </div>
                <div>
                  <span>Seat choosen</span>
                  <div className="text-right">
                    <span>{seatChosen.join(', ')}</span>
                  </div>
                </div>
                <div className="border my-3"></div>
                <div className="text-xl">
                  <span>Total Payment</span>
                  <span>IDR {(seatChosen.length * SEAT_PRICE).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                </div>
              </div>
            </div>
            <button type="submit"
              className="w-full bg-sunburst text-jet-black font-bold py-3 rounded hover:bg-marigold disabled:bg-ash disabled:hover:cursor-not-allowed"
              disabled={seatChosen.length > 0 ? false : true}>
              Checkout Now
            </button>
            {seatChosen.length > 0 ? "" : <span className="text-ash">* Please select a seat</span>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default SeatPage