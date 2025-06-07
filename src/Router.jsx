import { Routes, Route, Outlet } from 'react-router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import Header from './components/Header'
import MoviePage from './pages/MoviePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import MovieDetailPage from './pages/MovieDetailPage'
import PaymentPage from './pages/order/PaymentPage'
import ResultPage from './pages/order/ResultPage'
import SeatPage from './pages/order/SeatPage'
import ResetPage from './pages/auth/ResetPage'
import Profile from './pages/profile/Profile'
import History from './pages/profile/History'
import LayoutProfile from './components/LayoutProfile'
import PrivateRoutes from './components/PrivateRoutes'

function Layout() {
  const [transBg, setTransBg] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setTransBg(window.pageYOffset > 10)
      );
    }
  }, [])
  return (
    <div className='flex flex-col'>
      <Header className={`bg-${transBg && "jet-black"}`} />
      <Outlet className='grow' />
      <Footer />
    </div>
  )
}

function Router() {
  const userLogin = useSelector((state) => state.auth.data)
  const token = userLogin[0]?.token
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='movie'>
          <Route index element={<MoviePage />} />
          <Route path=':id' element={< MovieDetailPage />} />
        </Route>
      </Route>
      <Route element={<PrivateRoutes redirectPath='/' isAllowed={!!!token} />}>
        <Route path='/auth'>
          <Route path='login' element={< LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='reset-password' element={<ResetPage />} />
        </Route>
      </Route>
      <Route element={<PrivateRoutes redirectPath='/auth/login' isAllowed={!!token} />}>
        <Route path='/seat/:id' element={<Layout />}>
          <Route index element={< SeatPage />} />
          <Route path='payment'>
            <Route index element={< PaymentPage />} />
            <Route path='result' element={< ResultPage />} />
          </Route>
        </Route>
        <Route path='/profile' element={<LayoutProfile />}>
          <Route path='account' element={< Profile />} />
          <Route path='history' element={< History />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Router