import { Link } from 'react-router'
import notFound from '../assets/404-page.svg'
import { FaArrowRightLong } from "react-icons/fa6";

function NotFound() {
  return (
    <div className='text-white w-screen h-screen flex justify-center items-center p-12 bg-jet-black'>
      <div className='flex flex-col gap-3 items-center justify-center'>
        <img src={notFound} alt="not-found-page" />
        <div className='flex items-center justify-center gap-3'>
          <Link to="/">Go to home page</Link>
          <FaArrowRightLong />
        </div>
      </div>
    </div>
  )
}

export default NotFound