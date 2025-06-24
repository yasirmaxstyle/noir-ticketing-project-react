import { useCallback } from "react";
import { useForm } from "react-hook-form"
import Input from "../../components/Input"
import * as yup from 'yup';

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
  title: yup.string().required('Title is required'),
  genre: yup.array().required('Genre is required'),
})

function AddMovie() {
  const resolver = useYupValidationResolver(validationSchema)
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver })

  return (
    <div className='pt-20 min-h-screen w-screen flex justify-center bg-jet-black'>
      <div className='grid gap-3 p-3 md:p-12 max-w-[1080px] w-full h-fit text-ash bg-radial-[at_25%_25%] from-graphite to-jet-black to-65% border border-graphite'>
        <form className="p-6 grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <h2>Add New Movie</h2>
          <div className="grid">
            <span>Upload Image</span>
            <label htmlFor="poster" className="border bg-ash text-jet-black px-5 py-3 rounded w-fit hover:cursor-pointer">
              <span>Upload</span>
              <input type="file" name="poster-path" id="poster" className="opacity-0 w-0" />
            </label>
          </div>
          <Input
            id="movie-name"
            type="text"
            name="title"
            title="Movie Name"
            placeholder='Movie name'
            className="px-3 w-full outline-0 rounded"
            {...register("title")}
          />
          {errors.title && <span>{errors.title.message}</span>}
          <Input
            id="movie-genre"
            type="text"
            name="genre"
            title="Category"
            placeholder='Movie category'
            className="px-3 w-full outline-0 rounded"
          />
          <div className="flex gap-3">
            <Input
              id="movie-release"
              type="text"
              name="release_date"
              title="Release date"
              placeholder='Release date'
              className="px-3 w-full outline-0 rounded"
            />
            <Input
              id="movie-duration"
              type="text"
              name="runtime"
              title="Duration (minutes)"
              placeholder='Duration in minutes'
              className="px-3 w-full outline-0 rounded"
            />
          </div>
          <Input
            id="director"
            type="text"
            name="director"
            title="Director name"
            placeholder='Director name'
            className="px-3 w-full outline-0 rounded"
          />
          <Input
            id="cast"
            type="text"
            name="cast"
            title="Cast"
            placeholder='Cast'
            className="px-3 w-full outline-0 rounded"
          />
          <Input
            id="overview"
            type="textarea"
            rows='5'
            cols='33'
            name="overview"
            title="Synopsis"
            placeholder='Synopsis'
            className="px-3 w-full outline-0 rounded"
          />
          <Input
            id="location"
            type="text"
            name="location"
            title="Add Location"
            placeholder='Add location'
            className="px-3 w-full outline-0 rounded"
          />
          <Input
            id="movie-release"
            type="text"
            name="release_date"
            title="Release date"
            placeholder='Release date'
            className="px-3 w-full outline-0 rounded"
          />
          <div className="flex items-center gap-3">
            <Input
              id="date"
              type="date"
              name="date"
              title="Date & Time"
              placeholder='Release date'
              className="px-3 w-fit outline-0 rounded"
            />
            <div className="flex items-center rounded border">
              <input type="time" />
            </div>
          </div>
          <button className="bg-ash text-jet-black py-3 rounded my-6 font-bold">Save Movies</button>
        </form>
      </div>
    </div>
  )
}

export default AddMovie