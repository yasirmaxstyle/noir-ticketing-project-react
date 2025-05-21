import { Routes, Route, Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import MovieDetailPage from './pages/MovieDetailPage'
import { useEffect, useState } from 'react'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
// import PrivateRoute from './components/PrivateRoute'

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
    <>
      <Header className={`bg-${transBg && "jet-black"}`} />
      <Outlet />
      <Footer />
    </>
  )
}


function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='movie'>
          <Route index element={<MoviePage />} />
          <Route path=':id' element={< MovieDetailPage />} />
        </Route>
      </Route>
      <Route path='/auth'>
        <Route index element={< LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
      </Route>
      {/* <Route path='order'>
        <Route index element={<PrivateRoute redirectTo='/auth'>< Order /></PrivateRoute>} />
        <Route path='payment' element={< Payment />} />
        <Route path='result' element={< TicketResult />} />
      </Route> */}
    </Routes>
  )
}

export default Router