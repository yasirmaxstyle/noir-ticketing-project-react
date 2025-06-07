import { Link, Outlet, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Header from './Header'

function LayoutProfile() {
  const userData = useSelector(state => state.users.data)
  const userLogin = useSelector(state => state.auth.data)
  const currentUser = userData.find(e => e.id === userLogin[0].data.id)
  const location = useLocation()
  const [transBg, setTransBg] = useState(false);
  const history = useSelector(state => state.historyTransaction.data)
  const historyCurrentUser = history.filter(e => e.createdBy === userLogin[0].data.id)
  const completedPayment = historyCurrentUser.filter(e => e.data.payment.status === 'paid')

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setTransBg(window.pageYOffset > 10)
      );
    }
  }, [])

  const increasePoint = 20
  const master = 300
  let point = completedPayment.length * increasePoint
  let percentage = 100 / (master / (completedPayment.length * increasePoint))

  return (
    <>
      <Header className={`bg-${transBg && "jet-black"}`} />
      <section>
        <div className="pt-20 w-screen min-h-screen flex flex-col bg-jet-black">
          <div className="text-white flex flex-col items-center gap-3 w-full">
            <div className='max-w-[1080px] w-full px-6 mx-auto flex flex-col lg:flex-row gap-6'>
              <div className={`${location.pathname === '/profile/account' ? 'flex' : 'hidden'} bg-graphite p-12 lg:flex rounded flex flex-col items-center h-fit`}>
                <div>
                  <img src={currentUser.avatar}
                    alt="profile-user"
                    className='size-50 object-cover'
                  />
                </div>
                <div className='text-center mb-6'>
                  <span className='text-2xl font-bold'>{currentUser.username}</span>
                </div>
                <div className='grid gap-3 w-full mb-6'>
                  <span>Loyalty Points</span>
                  <div className='h-30 text-jet-black w-full bg-ash rounded flex flex-col justify-between p-3'>
                    <span>Moviegoers</span>
                    <span className='text-2xl'>{point} points</span>
                  </div>
                </div>
                <div className='grid gap-3'>
                  <span>{master - point} points more to become master</span>
                  <div className='rounded-full h-5 border-ash border flex'>
                    <div className={`bg-marigold rounded-full`} style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              </div>
              <div className='flex-1 grid h-fit gap-12'>
                <div className='bg-graphite h-fit flex-1 px-12 rounded text-center flex gap-6'>
                  <Link to='/profile/account' className={`h-full text-xl py-6 ${location.pathname === '/profile/account' && 'border-b-2 text-sunburst font-bold'}`}>
                    <span>Account Settings</span>
                  </Link>
                  <Link to='/profile/history' className={`h-full py-6 text-xl ${location.pathname === '/profile/history' && 'border-b-2 text-sunburst font-bold'}`}>
                    <span>Order History</span>
                  </Link>
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LayoutProfile