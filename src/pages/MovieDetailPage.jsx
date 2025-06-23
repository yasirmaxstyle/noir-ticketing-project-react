import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import getMovieDetail from '../api/getMovieDetail'
import convertHour from '../utils/convertHour';
import convertDate from '../utils/convertDate';
import { addOrderAction } from "../redux/reducers/transaction";
import moment from "moment/moment";
import ImageWithFallback from "../components/ImageWithFallback";
import Modal from "../components/Modal";
import { IoIosArrowDropdown } from "react-icons/io";
const useYupValidationResolver = validationSchema =>
  useCallback(
    async data => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message
              }
            }),
            {}
          )
        };
      }
    },
    [validationSchema]
  );

const validationSchema = yup.object({
  date: yup.string().required('Please select a date'),
  time: yup.string().required('Please select a time'),
  location: yup.string().required('Please select a location'),
  cinema: yup.string().required('Please select a cinema')
})

function MovieDetailPage() {
  const resolver = useYupValidationResolver(validationSchema)
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver })
  const [movie, setMovie] = useState({})
  const userLogin = useSelector((state) => state.auth.data)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [cinemas, setCinemas] = useState({})
  const [submit, setSubmit] = useState(false)
  const history = useSelector(state => state.historyTransaction.data)
  const paidHistory = history.filter(e => e.data.payment.status === 'paid')
  const [isFull, setIsFull] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    getMovieDetail(id).
      then(data => {
        setMovie(data)
        setIsLoaded(true)
      })

    fetch('/cinemas.json')
      .then(response => response.json())
      .then(cinema => {
        setCinemas(cinema)
      });
  }, [])

  const onSubmit = (data) => {
    if (userLogin.length === 0) {
      setIsLogin(!isLogin)
    } else {
      const matched = paidHistory.filter(e => {
        if (e.data.time === data.time
          && e.data.date === data.date
          && e.data.location === data.location
          && e.data.cinema === data.cinema
        ) return e
      })
      const totalSeats = []
      matched.forEach(e => totalSeats.push(...e.data.seat))
      if (totalSeats.length === 98) {
        setIsFull(true)
      } else {
        const userId = userLogin[0]?.data.id
        const bookData = {
          movie,
          id,
          data,
          createdBy: userId
        }
        dispatch(addOrderAction(bookData))
        setSubmit(true)
        setTimeout(() => {
          navigate(`/seat/${id}`)
        }, 3000);
      }
    }
  }

  return (
    <main>
      <section>
        <div className="lg:h-screen w-screen relative flex flex-col items-center justify-end">
          <div className="absolute size-full z-[-2] grayscale" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
          {/* <div className="absolute size-full z-[-1] bg-linear-to-t from-jet-black from-30% to-transparent to 100%" /> */}
          <div className="absolute size-full z-[-1] bg-radial-[at_50%_45%] from-transparent to-jet-black to-50%" />
          <div className='pt-30 px-6 grid lg:grid-flow-col place-items-center max-w-[1080px] gap-10 mb-10'>
            {isFull &&
              <>
                <div className="fixed z-[1] inset-0 h-full w-full opacity-80 bg-jet-black" />
                <Modal
                  message={'Sorry! This cinema is full. Please choose different time or location.'}
                  button1={'OK'}
                  close={() => setIsFull(!isFull)} />
              </>
            }
            {isLogin &&
              <>
                <div className="fixed z-[1] inset-0 h-full w-full opacity-80 bg-jet-black" />
                <Modal
                  message={'Sorry! You have to login to make a booking.'}
                  button1={'Close'}
                  button2={'Go to login page'}
                  link={'/auth/login'}
                  close={() => setIsLogin(!isLogin)} />
              </>
            }
            {isLoaded ?
              <>
                <div className='rounded-xl max-w-sm overflow-hidden'>
                  <ImageWithFallback
                    src={`https://image.tmdb.org/t/p/original/${movie['poster_path']}` || null}
                    alt={movie.title}
                    className='grayscale hover:grayscale-30 object-cover' />
                </div>
                <div className='flex flex-col gap-12 text-ash'>
                  <div className='grid gap-6 place-items-center lg:place-items-start text-center lg:text-left'>
                    <div>
                      <h2 className='text-5xl font-semibold text-sunburst'>{movie.title ? movie.title : ""}</h2>
                    </div>
                    <div>
                      <p>{movie.overview ? movie.overview : "-"}</p>
                    </div>
                    <div className='flex flex-wrap gap-3'>
                      {movie.genre?.map((genre) => <span className="px-3 py-1 border border-white text-white rounded-full" key={genre}>{genre}</span>) || ""}
                    </div>
                  </div>
                  <div className='grid grid-cols-2 md:flex'>
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
              </> :
              <div role="status" className="max-w-[1080px] w-full grid sm:grid-cols-2 gap-6 animate-pulse">
                <div className="flex items-center justify-center w-full h-100 bg-gray-300 rounded-sm">
                  <svg className="w-80 h-30 text-gray-200 dark:text-graphite" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="flex flex-col justify-evenly gap-3">
                  <div className="h-10 w-3/4 bg-gray-200 rounded-full dark:bg-ash" />
                  {Array.from({ length: 5 }, (_, idx) =>
                    <div key={`skeleton-${idx}`} className="h-5 bg-gray-200 rounded-full dark:bg-ash" />
                  )}
                </div>
              </div>
            }
          </div>
        </div>
      </section>
      <section>
        <div className="bg-jet-black py-12 px-6">
          <form onSubmit={handleSubmit(onSubmit)} className='border flex flex-col items-center max-w-[1080px] mx-auto w-full bg-jet-black text-ash gap-6 py-12 rounded'>
            <h1>Book Tickets</h1>
            <div className='flex flex-col sm:flex-row gap-6 *:flex *:flex-col *:gap-1'>
              <div>
                <span>Choose Date</span>
                <div className='border rounded px-6 py-3'>
                  <select className="appearance-none focus:outline-0" {...register('date', { required: true })} name="date" id="date">
                    {Array.from({ length: 5 }, (_, idx) =>
                      <option key={`date-list-${idx}`} value={moment().add(idx, 'days').format('LLLL').split(' ').slice(0, 4).join(' ')}>
                        {moment().add(idx, 'days').format('L')}
                      </option>
                    )}
                  </select>
                </div>
              </div>
              <div>
                <span>Choose Time</span>
                <div className='border flex justify-between rounded px-6 py-3'>
                  <select className="appearance-none focus:outline-0 w-full" {...register('time', { required: true })} name="time" id="time">
                    {cinemas.times?.map((time, idx) =>
                      <option key={`time-${idx}`} value={time}>{time}</option>
                    )}
                  </select>
                </div>
              </div>
              <div>
                <span>Choose Location</span>
                <div className='border rounded px-6 py-3'>
                  <select className="appearance-none focus:outline-0" {...register('location', { required: true })} name="location" id="location">
                    {cinemas.location?.map((city, idx) =>
                      <option key={`city-${idx}`} value={city}>{city}</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col  gap-1 items-center">
              <span>Choose Cinema</span>
              <div className='flex flex-col sm:flex-row px-6 gap-3 *:flex *:gap-1'>
                {cinemas.cinemas?.map((cinema, idx) =>
                  <label key={`cinema-list-${idx}`} htmlFor={cinema.name} className="border-2 overflow-hidden rounded flex items-center justify-center group has-checked:border-sunburst">
                    <input {...register('cinema')} type="radio" name="cinema" id={cinema.name} value={cinema.name} className="hidden" />
                    <img src={cinema.image || null} alt={cinema.name} className="aspect-16/9 h-20 object-cover grayscale group-has-checked:grayscale-0 group-hover:grayscale-0" />
                  </label>
                )}
              </div>
            </div>
            <div>
              <button type='submit'
                className='bg-sunburst min-w-40 min-h-10 text-jet-black border px-6 py-3 rounded-full hover:bg-marigold disabled:bg-ash disabled:cursor-not-allowed'
                disabled={submit}>
                {submit ?
                  <div
                    className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Redirecting...</span>
                  </div>
                  : <span>BOOK NOW</span>
                }
              </button>
            </div>
            <div className="grid">
              {errors.date && <span className="text-ash" role="alert">* {errors.date.message}</span>}
              {errors.time && <span className="text-ash" role="alert">* {errors.time.message}</span>}
              {errors.location && <span className="text-ash" role="alert">* {errors.location.message}</span>}
              {errors.cinema && <span className="text-ash" role="alert">* {errors.cinema.message}</span>}
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default MovieDetailPage