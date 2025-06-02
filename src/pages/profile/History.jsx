import { useSelector } from 'react-redux'

import moment from 'moment';
import QRCode from 'react-qr-code';
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from 'react';

function History() {
  const userLogin = useSelector(state => state.auth.data)
  const history = useSelector(state => state.historyTransaction.data)
  const [toggle, setToggle] = useState(false)
  const [index, setIndex] = useState()

  const historyCurrentUser = history.filter(e => e.createdBy === userLogin[0].data.id)

  const handleClick = (idx) => {
    setToggle(!toggle)
    setIndex(idx)
  }

  return (
    <section className='grid gap-6'>
      {historyCurrentUser.map((history, idx) => {
        return (
          <div className='bg-graphite py-6 rounded grid gap-6'>
            <div className='flex justify-between border-b pb-3 items-center px-6'>
              <div className='grid gap-3'>
                <span>{history.data.date} - {history.data.time}</span>
                <span className='text-2xl font-bold'>{history.movie.title}</span>
              </div>
              <div>
                <span className='font-bold text-xl'>{history.data.cinema}</span>
              </div>
            </div>
            <div className='flex items-center justify-between px-6'>
              <div className='flex gap-3 *:px-6 *:py-1 *:rounded'>
                <div className='border'>ticket in active</div>
                <div className='bg-ash text-jet-black'>{history.data.payment.status.toUpperCase()}</div>
              </div>
              <div className='flex items-center gap-2'>
                <span>Details</span>
                <button
                  className='text-2xl'
                  onClick={() => handleClick(idx)}>
                  <RiArrowDropDownLine className={`${toggle && 'rotate-180'}`}/>
                </button>
              </div>
            </div>
            {toggle && index === idx &&
              <div className='px-6 grid gap-3'>
                <div>
                  <span>Ticket Information</span>
                </div>
                <div className='flex gap-6'>
                  <div className='basis-30'>
                    <div style={{ height: "auto", margin: "0 auto", width: "100%" }}>
                      <QRCode
                        size={200}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={history.movie.title}
                        viewBox={`0 0 200 200`}
                      />
                    </div>
                  </div>
                  <div className="*:flex *:gap-3 grid gap-3 *:**:grid *:**:**:first:text-ash *:**:**:last:font-bold">
                    <div className='flex justify-between'>
                      <div>
                        <span>Category</span>
                        <span>PG-13</span>
                      </div>
                      <div>
                        <span>Time</span>
                        <span>{history.data.time}</span>
                      </div>
                      <div>
                        <span>Seats</span>
                        <span>{history.data.seat.join(', ')}</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>Movie</span>
                        <span>{history.movie.title}</span>
                      </div>
                      <div>
                        <span>Date</span>
                        <span>{moment(history.data.date).format('LL').toString()}</span>
                      </div>
                      <div>
                        <span>Count</span>
                        <span>{history.data.seat.length} pcs</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-bold rounded grid place-content-center">
                    <span>TOTAL</span>
                    <span>IDR {(history.data.seat.length * 50000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        )
      })}
    </section>
  )
}

export default History