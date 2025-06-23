import { Link, useLocation, useNavigate } from 'react-router';
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../redux/reducers/auth';
import logo from '../assets/new-noir.svg'

import { IoMenu } from "react-icons/io5";
import { useState } from 'react';

export default function Header({ className }) {
  const currentUser = useSelector((state) => state.auth.data)
  const dataOrder = useSelector(state => state.transaction.data)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const location = useLocation()
  const [menu, setMenu] = useState(false)
  const userId = currentUser[0]?.data.id
  const userOrder = dataOrder.filter(e => {
    if (e.createdBy === userId) return e
  })

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
        <div className='flex p-3 items-center justify-between w-full md:px-12'>
          <Link to={'/'}>
            <img src={logo} alt="logo-tickitz" className='w-20' />
          </Link>
          <div className='hidden md:flex gap-6 items-center'>
            <Link to={'/'}>
              <span className={`text-white font-bold ${location.pathname === '/' && 'border-b-2 border-sunburst text-xl'}`}>HOME</span>
            </Link>
            <Link to={'/movie'}>
              <span className={`text-white font-bold ${location.pathname === '/movie' && 'border-b-2 border-sunburst text-xl'}`}>MOVIE</span>
            </Link>
            {userOrder.length > 0 ?
              <Link to={`/seat/${userOrder[userOrder.length - 1].id}`}>
                <span className={`text-white font-bold ${location.pathname === '/movie:id' && 'border-b-2 border-sunburst text-xl'}`}>BUY TICKET</span>
              </Link> :
              <Link to=''>
                <span className={`text-white font-bold ${location.pathname === '/movie:id' && 'border-b-2 border-sunburst text-xl'}`}>BUY TICKET</span>
              </Link>
            }
          </div>
          {currentUser.length === 0 ?
            <div className='hidden md:flex gap-3'>
              <Link to={'/auth/login'}>
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
            </div> :
            <div className='hidden md:flex gap-3'>
              <Link to={'/profile/account'}>
                <span className='text-white font-bold'>
                  PROFILE
                </span>
              </Link>
              <button onClick={handleLogout} className='flex items-center gap-1'>
                <span className='text-white font-bold'>
                  LOGOUT
                </span>
                <LuSquareArrowOutUpRight className='text-white' />
              </button>
            </div>}
          <div className='md:hidden text-2xl flex justify-center items-center text-white'>
            <button onClick={toggleMenu}>
              <IoMenu />
            </button>
          </div>
        </div>
        {/* MOBILE TOGGLE MENU */}
        <div className={`pt-15 pb-6 absolute transition-all ease-in-out duration-200 -translate-y-full ${menu && 'translate-y-0'} grid md:hidden bg-jet-black w-full z-[-1]`}>
          <div className='flex flex-col gap-6 items-center'>
            <Link to={'/'}>
              <span className={`text-white font-bold`}>HOME</span>
            </Link>
            <Link to={'/movie'}>
              <span className={`text-white font-bold`}>MOVIE</span>
            </Link>
            {userOrder.length > 0 ?
              <Link to={`/seat/${userOrder[userOrder.length - 1].id}`}>
                <span className={`text-white font-bold ${location.pathname === '/movie:id' && 'border-b-2 border-sunburst text-xl'}`}>BUY TICKET</span>
              </Link> :
              <Link to=''>
                <span className={`text-white font-bold ${location.pathname === '/movie:id' && 'border-b-2 border-sunburst text-xl'}`}>BUY TICKET</span>
              </Link>
            }
            {currentUser.length === 0 ?
              <>
                <Link to={'/auth/login'}>
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
              </> :
              <>
                <Link to={'/profile/account'}>
                  <span className='text-white font-bold'>
                    PROFILE
                  </span>
                </Link>
                <button onClick={handleLogout} className='flex items-center gap-1'>
                  <span className='text-white font-bold'>
                    LOGOUT
                  </span>
                  <LuSquareArrowOutUpRight className='text-white' />
                </button>
              </>}
          </div>
        </div>
      </nav>
    </header>
  )
}