import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { useState } from 'react';

import moment from 'moment';
import QRCode from 'react-qr-code';
import toast, { Toaster } from 'react-hot-toast';
import { RiArrowDropDownLine } from "react-icons/ri";
import { finishPaymentAction } from '../../redux/reducers/transaction';
import { updateHistoryAction } from '../../redux/reducers/historyTransactions';
import Modal from '../../components/Modal';

function History() {
  const userLogin = useSelector(state => state.auth.data)
  const history = useSelector(state => state.historyTransaction.data)
  const [toggle, setToggle] = useState(false)
  const [index, setIndex] = useState()
  const [isDue, setIsDue] = useState(false)
  const [expired, setExpired] = useState(false)
  const historyCurrentUser = history.filter(e => e.createdBy === userLogin[0].data.id)
  let navigate = useNavigate()

  const dispatch = useDispatch()

  const handleClick = (idx) => {
    setToggle(!toggle)
    setIndex(idx)
  }

  const handlePayment = (hist) => {
    const current = moment().seconds()

    let status
    const obj = {
      status,
      expired: true,
      transactionId: hist.transactionId
    }

    if (current > hist.data.payment.dueTime.split(':').pop().split(' ').shift()) {
      status = 'not paid'
      dispatch(updateHistoryAction({
        ...obj,
        status: status
      }))
      dispatch(finishPaymentAction({
        ...obj,
        status: status
      }))
      setIsDue(!isDue)
      setExpired(!expired)
    } else {
      status = 'paid'
      dispatch(updateHistoryAction({
        ...obj,
        status: status
      }))
      dispatch(finishPaymentAction({
        ...obj,
        status: status
      }))
      setTimeout(() => {
        navigate(`/seat/${hist.id}/payment/result`)
      }, 1000);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText('12321328913829724')
    notify()
  }
  const notify = () => {
    toast.success('Text is copied')
  }

  return (
    <section className='grid gap-6'>
      <Toaster />
      {isDue &&
        <>
          <div className="fixed z-[1] inset-0 h-screen w-screen opacity-80 bg-jet-black" />
          <Modal
            title='Oops!!!'
            type='payment'
            message={`Sorry! Your time is over! But it's ok. You can book your ticket again.`}
            button1={'Close'}
            button2={'Book again'}
            close={() => setIsDue(!isDue)}
            onPayment={() => navigate('/movie')} />
        </>
      }
      {historyCurrentUser.map((history, idx) => {
        return (
          <div key={`history-list-${idx}`} className='bg-graphite py-6 rounded grid gap-6'>
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
              <div className='flex flex-col xs:flex-row gap-3 *:px-6 *:py-1 *:rounded'>
                <div className='border'>ticket in active</div>
                <div className={`${history.data.payment.status === 'paid' ?
                  'bg-marigold text-jet-black' : 'bg-ash text-jet-black'} text-center`}>
                  {history.data.payment.status.toUpperCase()}
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <span>Details</span>
                <button
                  className='text-2xl'
                  onClick={() => handleClick(idx)}>
                  <RiArrowDropDownLine className={`${toggle && 'rotate-180'}`} />
                </button>
              </div>
            </div>
            {toggle && index === idx && history.data.payment.status === 'paid' &&
              <div className='px-6 grid gap-3'>
                <div>
                  <span>Ticket Information</span>
                </div>
                <div className='flex flex-col sm:flex-row gap-6'>
                  <div className='basis-30 border rounded p-3'>
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
                  <div className="font-bold rounded grid sm:place-content-center">
                    <span>TOTAL</span>
                    <span>IDR {(history.data.seat.length * 50000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                  </div>
                </div>
              </div>}
            {toggle && index === idx && history.data.payment.status === 'not paid' &&
              <div className='px-6 grid gap-3'>
                <div>
                  <span>Ticket Information</span>
                </div>
                <div className="grid gap-1">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <span className='text-ash'>Virtual Account</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">12321328913829724</span>
                      <button type="button"
                        className="border rounded px-2 py-1 hover:bg-jet-black hover:text-sunburst"
                        onClick={handleCopy}>Copy</button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className='text-ash'>Total Payment</span>
                    <span className="font-bold">IDR {(history.data.seat.length * 50000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                  </div>
                  <div></div>
                </div>
                <div>
                  <p className='text-ash'>Pay this payment bill before it is due, on <span className='text-sunburst'>{history.data.payment.dueTime}</span>. If the bill has not been paid by the specified time, it will be forfeited.</p>
                </div>
                <div className="flex gap-3 font-bold">
                  <button type="button"
                    onClick={() => handlePayment(history)}
                    disabled={expired}
                    className="bg-marigold text-jet-black hover:bg-sunburst px-6 py-3 rounded disabled:bg-ash disabled:cursor-not-allowed">
                    Check payment
                  </button>
                </div>
                {expired && <span className='text-sm text-ash'>*Payment is disabled because of overdue</span>}
              </div>
            }
          </div>
        )
      })}
    </section>
  )
}

export default History