import { Link, useLocation, useNavigate } from 'react-router';
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../redux/reducers/auth';
import logo from '../assets/new-noir.svg'

import { IoMenu } from "react-icons/io5";
import { useState } from 'react';

function HeaderAdmin({ className }) {
  const location = useLocation()
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [menu, setMenu] = useState(false)

  const handleLogout = () => {
    dispatch(logoutUserAction())
    navigate('/auth/login')
  }

  const toggleMenu = () => {
    setMenu(!menu)
  }

  return (
    <header>
      <nav className={`flex fixed z-10 w-screen justify-center ${className}`}>
        <div className='flex max-w-[1080px] p-2 items-center justify-between w-full px-3'>
          <Link to={'/admin/dashboard'}>
            <img src={logo} alt="logo-tickitz" className='w-20' />
          </Link>
          <div className='hidden md:flex gap-6 items-center'>
            <Link to={'/admin/dashboard'}>
              <span className={`text-white font-bold ${location.pathname === '/admin/dashboard' && 'border-b-2 border-sunburst text-xl'}`}>DASHBOARD</span>
            </Link>
            <Link to={'/admin/movie'}>
              <span className={`text-white font-bold ${location.pathname === '/admin/movie' && 'border-b-2 border-sunburst text-xl'}`}>MOVIE</span>
            </Link>
          </div>
          <div className='hidden md:flex gap-3'>
            <button onClick={handleLogout} className='flex items-center gap-1'>
              <span className='text-white font-bold'>
                LOGOUT
              </span>
              <LuSquareArrowOutUpRight className='text-white' />
            </button>
          </div>
          <div className='md:hidden text-2xl flex justify-center items-center text-white'>
            <button onClick={toggleMenu}>
              <IoMenu />
            </button>
          </div>
        </div>
        {/* MOBILE TOGGLE MENU */}
        <div className={`pt-15 pb-6 absolute transition-all ease-in-out duration-200 -translate-y-full ${menu && 'translate-y-0'} grid md:hidden bg-jet-black w-full z-[-1]`}>
          <div className='flex flex-col gap-6 items-center'>
            <Link to={'/admin/dashboard'}>
              <span className={`text-white font-bold ${location.pathname === '/admin/dashboard' && 'border-b-2 border-sunburst text-xl'}`}>DASHBOARD</span>
            </Link>
            <Link to={'/admin/movie'}>
              <span className={`text-white font-bold ${location.pathname === '/admin/movie' && 'border-b-2 border-sunburst text-xl'}`}>MOVIE</span>
            </Link>
            <button onClick={handleLogout} className='flex items-center gap-1'>
              <span className='text-white font-bold'>
                LOGOUT
              </span>
              <LuSquareArrowOutUpRight className='text-white' />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeaderAdmin