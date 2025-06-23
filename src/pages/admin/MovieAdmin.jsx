import { Link } from "react-router"

function MovieAdmin() {
  return (
    <div className='pt-20 min-h-screen w-screen flex justify-center bg-jet-black'>
      <div className='grid gap-3 p-3 md:p-12 max-w-[1080px] w-full h-fit text-ash bg-radial-[at_25%_25%] from-graphite to-jet-black to-65% border border-graphite'>
        <div className="flex justify-between items-center">
          <h2>List Movie</h2>
          <div className="flex *:border gap-3 *:px-5 *:py-3 *:rounded">
            <div>Juni 2025</div>
            <Link to='add-movie' className="bg-ash text-jet-black">Add Movie</Link>
          </div>
        </div>
        <table>
          <thead className="*:py-3 *:px-5 *:border">
            <th>No</th>
            <th>Thumbnail</th>
            <th>Movie Name</th>
            <th>Category</th>
            <th>Release Date</th>
            <th>Duration</th>
            <th>Action</th>
          </thead>
        </table>
      </div>
    </div>
  )
}

export default MovieAdmin