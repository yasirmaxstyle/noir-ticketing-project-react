import { Link, useLocation, useNavigate } from 'react-router';
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../redux/reducers/auth';
import logo from '../assets/noir-logo.svg'

export default function Header({ className }) {
  const currentUser = useSelector((state) => state.auth.data)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    dispatch(logoutUserAction())
    navigate('/auth/login')
  }
  return (
    <header>
      <nav className={`flex fixed z-10 w-screen justify-center ${className}`}>
        <div className='flex max-w-[1080px] items-center justify-between w-full'>
          <a href="">
            <img src={logo} alt="logo-tickitz" className='w-20' />
          </a>
          <div className='flex gap-3 items-center'>
            <Link to={'/'}>
              <span className={`text-white font-bold ${location.pathname === '/' && 'border-b-2 border-sunburst text-xl'}`}>HOME</span>
            </Link>
            <Link to={'/movie'}>
              <span className={`text-white font-bold ${location.pathname === '/movie' && 'border-b-2 border-sunburst text-xl'}`}>MOVIE</span>
            </Link>
            <Link to={'/order/:id'}>
              <span className={`text-white font-bold ${location.pathname === '/movie:id' && 'border-b-2 border-sunburst text-xl'}`}>BUY TICKET</span>
            </Link>
          </div>
          {currentUser.length === 0 ?
            <div className='flex gap-3'>
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
            <div className='flex gap-3'>
              <Link to={'/'}>
                <span className='text-white font-bold'>
                  DASHBOARD
                </span>
              </Link>
              <button onClick={handleLogout} className='flex items-center gap-1'>
                <span className='text-white font-bold'>
                  LOGOUT
                </span>
                <LuSquareArrowOutUpRight className='text-white' />
              </button>
            </div>}
        </div>
      </nav>
    </header>
  )
}