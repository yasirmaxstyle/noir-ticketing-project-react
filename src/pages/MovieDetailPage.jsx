import { useCallback, useEffect, useState } from "react";
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

  const { id } = useParams()

  useEffect(() => {
    getMovieDetail(id).
      then(data => {
        setMovie(data)
      })

    fetch('/public/cinemas.json')
      .then(response => response.json())
      .then(cinema => {
        setCinemas(cinema)
      });
  }, [])

  const onSubmit = (data) => {
    const userId = userLogin[0].data.id
    const bookData = {
      movie,
      id,
      data,
      createdBy: userId
    }
    dispatch(addOrderAction(bookData))
    setSubmit(true)
    navigate(`/seat/${id}`)
  }

  return (
    <main>
      <section>
        <div className="h-screen w-screen relative flex flex-col items-center justify-end">
          <div className="absolute size-full z-[-2] grayscale" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }} />
          <div className="absolute size-full z-[-1] bg-linear-to-t from-jet-black from-30% to-transparent to 100%" />
          <div className='grid grid-flow-col max-w-[1080px] gap-10 mb-10'>
            <div className='rounded-xl max-w-sm overflow-hidden'>
              <ImageWithFallback
                src={`https://image.tmdb.org/t/p/original/${movie['poster_path']}`}
                alt={movie.title}
                className='grayscale hover:grayscale-30 aspect-2/3 object-cover' />
            </div>
            <div className='flex flex-col gap-12 text-ash'>
              <div className='grid gap-6'>
                <div>
                  <span className='text-5xl font-semibold text-sunburst'>{movie.title ? movie.title : ""}</span>
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
        <div className="bg-jet-black py-12">
          <form onSubmit={handleSubmit(onSubmit)} className='border flex flex-col items-center max-w-[1080px] mx-auto w-full bg-jet-black text-ash gap-6 py-12 rounded'>
            <h1>Book Tickets</h1>
            <div className='flex gap-6 *:flex *:flex-col *:gap-1'>
              <div>
                <span>Choose Date</span>
                <div className='border rounded px-6 py-3'>
                  <select {...register('date', { required: true })} name="date" id="date">
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
                <div className='border rounded px-6 py-3'>
                  <select {...register('time', { required: true })} name="time" id="time">
                    {cinemas.times?.map((time, idx) =>
                      <option key={`time-${idx}`} value={time}>{time}</option>
                    )}
                  </select>
                </div>
              </div>
              <div>
                <span>Choose Location</span>
                <div className='border rounded px-6 py-3'>
                  <select {...register('location', { required: true })} name="location" id="location">
                    {cinemas.location?.map((city, idx) =>
                      <option key={`city-${idx}`} value={city}>{city}</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span>Choose Cinema</span>
              <div className='flex gap-3 *:flex *:gap-1'>
                {cinemas.cinemas?.map((cinema, idx) =>
                  <label key={`cinema-list-${idx}`} htmlFor={cinema.name} className="border-4 overflow-hidden rounded flex items-center justify-center group has-checked:border-sunburst">
                    <input {...register('cinema')} type="radio" name="cinema" id={cinema.name} value={cinema.name} className="hidden" />
                    <img src={cinema.image} alt={cinema.name} className="aspect-16/9 w-30 object-cover grayscale group-hover:grayscale-0" />
                  </label>
                )}
              </div>
            </div>
            <div>
              <button type='submit'
                className='bg-sunburst text-jet-black border px-6 py-3 rounded-full'
                disabled={submit}>
                BOOK NOW
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