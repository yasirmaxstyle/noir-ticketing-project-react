import React, { useState } from "react"
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
        <div className="text-ash hidden lg:flex flex-col items-center gap-3 max-w-xl w-full mb-12 p-3">
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
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6 px-3 max-w-[1080px] w-full mx-auto">
          <div className="flex flex-col lg:max-w-[650px] items-center justify-center p-6 rounded bg-radial-[at_0%_25%] from-graphite to-jet-black to-65%">
            <div className="flex flex-col sm:flex-row items-center px-3 py-3 border border-ash rounded gap-3 text-ash">
              <div className="grid w-70 h-full overflow-hidden rounded">
                <img src={`https://image.tmdb.org/t/p/original/${currentOrder.movie.poster_path}`} alt={currentOrder.movie.title} className="aspect-auto xs:aspect-square sm:aspect-video object-cover grayscale hover:grayscale-25" />
              </div>
              <div className="gap-3 flex flex-col items-center sm:items-start w-full">
                <div className="text-sunburst font-bold text-2xl text-center sm:text-left">{currentOrder.movie.title}</div>
                <div className="flex flex-col items-center gap-3 sm:flex-row justify-between w-full">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex gap-1">{currentOrder.movie.genre.slice(0, 2).map((genre, idx) => <span className="px-3 bg-ash text-graphite rounded-full" key={`list-${genre}-${idx}`}>{genre}</span>)}
                    </div>
                    <span>REGULAR - {currentOrder.data.time}</span>
                  </div>
                  <button type="button" onClick={(e) => handleChange(e)} className="bg-sunburst text-jet-black font-bold px-5 py-2 rounded hover:bg-marigold w-fit">
                    CHANGE
                  </button>
                </div>
              </div>
            </div>
            <h4 className="text-white font-bold mt-3">Choose Your Seat</h4>
            <div className="py-6 md:px-12 flex flex-col gap-6">
              <div className="text-center border border-ash rounded py-1">
                <span className="text-white text-center">Screen</span>
              </div>
              <div className="flex gap-3 w-fit">
                <div className="hidden sm:grid gap-3">
                  {Array.from(['A', 'B', 'C', 'D', 'E', 'F', 'G', ''], (letter, idx) =>
                    <div key={`letter-cols-${idx}`} className="size-5 text-white flex justify-center items-center">
                      <span>{letter}</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-6 sm:gap-12 w-fit">
                  <div className="grid gap-3">
                    <div className='grid grid-cols-7 gap-1 sm:gap-3'>
                      {Array.from(['A', 'B', 'C', 'D', 'E', 'F', 'G'], (letter, idx) =>
                        <React.Fragment key={`seat-left-cols-${idx}`}>
                          {Array.from({ length: 7 }, (_, idx) =>
                            <React.Fragment key={`seat-left-rows-${idx}`}>
                              <Seat onChange={handleSeat}
                                name='seat'
                                idx={`seat-${letter}${idx + 1}`}
                                value={`${letter}${idx + 1}`}
                                order={currentOrder}
                              />
                            </React.Fragment>)}
                        </React.Fragment>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1 sm:gap-3 w-full">
                      {Array.from({ length: 7 }, (_, idx) =>
                        <div key={`letter-left-rows-${idx}`} className="size-4 sm:size-5 text-white flex justify-center items-center">
                          <span>{idx + 1}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className='grid grid-cols-7 gap-1 sm:gap-3'>
                      {Array.from(['A', 'B', 'C', 'D', 'E', 'F', 'G'], (letter, idx) =>
                        <React.Fragment key={`seat-right-cols-${idx}`}>
                          {Array.from({ length: 7 }, (_, idx) =>
                            <React.Fragment key={`seat-right-rows-${idx}`}>
                              <Seat onChange={handleSeat}
                                name='seat'
                                idx={`seat-${letter}${idx + 8}`}
                                value={`${letter}${idx + 8}`}
                                order={currentOrder}
                              />
                            </React.Fragment>)}
                        </React.Fragment>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1 sm:gap-3 w-full">
                      {Array.from({ length: 7 }, (_, idx) =>
                        <div key={`letter-right-rows-${idx}`} className="size-4 sm:size-5 text-white flex justify-center items-center">
                          <span>{idx + 8}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-white flex flex-col gap-3">
                <span className="font-bold">Seating Key</span>
                <div className="grid grid-cols-2 gap-6 *:flex *:gap-3 *:**:first:size-5 *:**:first:rounded ">
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
            <div className="bg-radial-[at_15%_15%] from-graphite to-jet-black to-50% py-6 rounded">
              <h2 className="text-sunburst text-center font-bold">{currentOrder.data.cinema}</h2>
              <div className="p-6 text-ash flex flex-col gap-3 *:flex *:justify-between *:gap-3 *:**:nth-[2]:text-sunburst *:**:nth-[2]:font-bold">
                <div>
                  <span>Movie selected</span>
                  <span className="text-right">{currentOrder.movie.title}</span>
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