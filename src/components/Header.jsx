import { Link } from 'react-router';
import logo from '../assets/noir-logo.svg'
import { LuSquareArrowOutUpRight } from "react-icons/lu";

export default function Header({ className }) {
  return (
    <header>
      <nav className={`flex fixed z-10 w-screen justify-center ${className}`}>
        <div className='flex max-w-[1080px] items-center justify-between w-full'>
          <a href="">
            <img src={logo} alt="logo-tickitz" className='w-20' />
          </a>
          <div className='flex gap-3'>
            <Link to={'/'}>
              <span className='text-white font-bold'>HOME</span>
            </Link>
            <Link to={'/movie'}>
              <span className='text-white font-bold'>MOVIE</span>
            </Link>
            <Link to={'/movie:id'}>
              <span className='text-white font-bold'>BUY TICKET</span>
            </Link>
          </div>
          <div className='flex gap-3'>
            <Link to={'/auth'}>
              <span className='text-white font-bold'>
                LOGIN
              </span>
            </Link>
            <Link to={'/auth/register'} className='flex items-center gap-1'>
              <span className='text-white font-bold'>
                SIGN UP
              </span>
              <LuSquareArrowOutUpRight className='text-white' />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}